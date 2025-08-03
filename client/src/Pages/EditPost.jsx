import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/post/${slug}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setPost(data.post);
        } else {
          console.error(data.message || "Post not found");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching post:", err.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      navigate("/");
    }
  }, [slug, navigate, API_BASE, userData.token]);

  if (loading) {
    return (
      <div className="py-8">
        <Container>
          <h1>Loading...</h1>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-8">
        <Container>
          <h1>Post not found</h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container className="w-5xl">
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
