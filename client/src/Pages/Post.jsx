import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deletePost as deletePostSlice } from "../store/postSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams(); // slug is post._id
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId._id === userData._id : false;

  const allPosts = useSelector((state) => state.post.posts);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const res = await fetch(`${BASE_URL}/api/post/${slug}`, {
            credentials: "include",
          });

          if (res.ok) {
            const data = await res.json();
            setPost(data);
          } else {
            console.error("Post not found");
            navigate("/");
          }
        } catch (err) {
          console.error("Error fetching post:", err.message);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate, BASE_URL]);

  const deletePost = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post? This action cannot be undone.");
    if (!confirmed) return;
    
    try {
      const res = await fetch(`${BASE_URL}/api/delete-post/${post.slug}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete post");

      dispatch(deletePostSlice(post._id));
      navigate("/");
    } catch (err) {
      console.error("Delete Error:", err.message);
    }
  };

  return post ? (
    <div className="py-8 max-w-5xl m-auto rounded-xl">
      <h1 className="text-xl text-center text-gray-700 pb-4">
        <span className="font-bold text-gray-900">Posted By:</span> {post.userId ? `${post.userId.firstname} ${post.userId.lastname}` : 'Unknown User'}
      </h1>
      <Container>
        <div className="w-full text-center grid gap-3 sm:flex mb-2 sm:relative p-2">
          {post.crimeImage && (
            <img
              src={`${BASE_URL}/uploads/${post.crimeImage}`}
              alt={post.crimeType}
              className="rounded-xl sm:max-w-md m-auto"
            />
          )}

          {isAuthor && (
            <div className="text-center mt-2 sm:absolute sm:right-6 sm:top-6">
              <Link to={`/edit-post/${post.slug}`}>
                <Button className="mr-3 bg-green-600 hover:bg-green-700 text-white">
                  Edit
                </Button>
              </Link>
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            {post.crimeType} ({post.crimeLocation})
          </h1>
        </div>
        <div className="text-center browser-css">{post.crimeDescription}</div>
      </Container>
    </div>
  ) : null;
}
