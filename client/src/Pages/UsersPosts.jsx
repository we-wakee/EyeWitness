import React, { useState, useEffect } from "react";
import { Container, PostCard, Button } from "../components/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UsersPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.post.posts);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData._id && allPosts.length > 0) {
      const filtered = allPosts.filter((post) => post.userId === userData._id);
      setUserPosts(filtered);
    }
  }, [allPosts, userData]);

  if (!userPosts.length) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold">No Crimes Added by You.</h1>
          <Button
            className="hover:bg-blue-800 mt-5"
            onClick={() => navigate("/add-post")}
          >
            Add Crime
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid sm:flex sm:flex-wrap">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="p-2 mx-auto text-center sm:w-1/4 sm:m-0"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UsersPosts;
