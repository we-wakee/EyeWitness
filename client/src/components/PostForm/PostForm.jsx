import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "../index";
import { addPost, updatePost, setPost } from "../../store/postSlice";

const PostForm = ({ post }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      crimeType: post?.crimeType || "",
      crimeImage: "",
      crimeLocation: post?.crimeLocation || "",
      crimeDescription: post?.crimeDescription || "",
    },
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("crimeType", data.crimeType);
    formData.append("crimeLocation", data.crimeLocation);
    formData.append("crimeDescription", data.crimeDescription);

    if (data.crimeImage[0]) {
      formData.append("crimeImage", data.crimeImage[0]);
    }

    try {
      let response, postData;

      if (post) {
        // Update Post
        response = await fetch(`${API_BASE}/api/edit-post/${post.slug}`, {
          method: "PUT",
          body: formData,
          credentials: "include", // important for cookie-based auth
        });

        postData = await response.json();

        if (response.ok) {
          // Refetch all posts to update Redux state
          const postsRes = await fetch(`${API_BASE}/api/posts`, { credentials: "include" });
          if (postsRes.ok) {
            const postsData = await postsRes.json();
            dispatch(setPost(Array.isArray(postsData) ? postsData : postsData.posts));
          }
          navigate(`/post/${postData.post.slug}`);
        } else {
          setError(postData.message || "Failed to update post");
        }
      } else {
        // Create Post
        response = await fetch(`${API_BASE}/api/add-post`, {
          method: "POST",
          body: formData,
          credentials: "include", // important for cookie-based auth
        });

        postData = await response.json();

        if (response.ok) {
          dispatch(addPost(postData.post));
          navigate(`/post/${postData.post.slug}`);
        } else {
          setError(postData.message || "Failed to create post");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full px-2">
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <Input
          label="Crime Type :"
          className="mb-4"
          placeholder="Robbery / Murder / Kidnap ..."
          {...register("crimeType", { required: true })}
        />
      </div>

      <div className="w-full p-2">
        <Input
          label="Crime Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("crimeImage", { required: !post })}
        />

        {post?.crimeImage && (
          <div className="w-full mb-4">
            <img
              src={`${API_BASE}/uploads/${post.crimeImage}`}
              alt={post.crimeType}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="w-full md:w-2/3 px-2">
          <Input
            label="Crime Location :"
            className="mb-4"
            placeholder="e.g., Madhapur, Hyderabad"
            {...register("crimeLocation", { required: true })}
          />

          <Input
            label="Crime Description :"
            className="mb-4"
            placeholder="Detailed description of the incident"
            {...register("crimeDescription", { required: true })}
          />
        </div>

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-30"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
