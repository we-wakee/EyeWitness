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
  const isAuthor = post && userData ? post.userId === userData._id : false;

  const allPosts = useSelector((state) => state.post.posts);

  useEffect(() => {
    if (slug) {
      const matchedPost = allPosts.find((p) => p._id === slug);
      if (matchedPost) {
        setPost(matchedPost);
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [slug, navigate, allPosts]);

  const deletePost = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
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
      <h1 className="text-xl text-center text-gray-600 pb-4">
        <span className="font-bold">Posted By:</span> {post.userName}
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
              <Link to={`/edit-post/${post._id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">
            {post.crimeType} ({post.crimeLocation})
          </h1>
        </div>
        <div className="text-center browser-css">{post.crimeDescription}</div>
      </Container>
    </div>
  ) : null;
}
