import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ _id, crimeType = "Unknown Crime", crimeImage }) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = crimeImage ? `${API_BASE}/uploads/${crimeImage}` : null;

  return (
    <Link to={`/post/${_id}`}>
      <div className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 ease-in-out">
        <div className="w-full flex justify-center mb-3">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={crimeType}
              className="rounded-xl max-h-52 w-full object-cover"
            />
          ) : (
            <div className="h-52 w-full bg-gray-200 flex items-center justify-center rounded-xl text-gray-500 text-sm">
              No Image Available
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-800 capitalize">
          {crimeType}
        </h2>
      </div>
    </Link>
  );
};

export default PostCard;
