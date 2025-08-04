import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  LoadingComponent,
  PostCard,
} from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setPost } from "../store/postSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state.post.posts);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/posts`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        console.log("Fetched Data:", data);

        // ✅ Adjusted to support both [{...}] or { posts: [{...}] }
        if (Array.isArray(data)) {
          dispatch(setPost(data));
        } else if (Array.isArray(data.posts)) {
          dispatch(setPost(data.posts));
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("posts :: getPosts ::", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchPosts();
    } else {
      setLoading(false); // avoid infinite loading if user not logged in
    }
  }, [dispatch, userData?.token]);

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold">Please Login!</h1>
          <Button
            className="hover:bg-blue-800 mt-5"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Container>
      </div>
    );
  }

  return !loading ? (
    <div className="w-full py-8">
      <Container>
        <div className="grid sm:flex sm:flex-wrap">
          {posts.map((post) => (
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
  ) : (
    <LoadingComponent />
  );
}

export default Home;
