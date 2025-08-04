import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ _id, slug, crimeType = "Unknown Crime", crimeImage, userId }) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = crimeImage ? `${API_BASE}/uploads/${crimeImage}` : null;
  const authorName = userId ? `${userId.firstname} ${userId.lastname}` : 'Unknown User';

  return (
    <Link to={`/post/${slug}`}>
      <div className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 ease-in-out">
        <div className="w-full flex justify-center mb-3">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={crimeType}
              className="rounded-xl max-h-52 w-full object-cover"
            />
          ) : (
            <div className="h-52 w-full bg-gray-100 flex items-center justify-center rounded-xl text-gray-500 text-sm">
              No Image Available
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-900 capitalize">
          {crimeType}
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          By: {authorName}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
