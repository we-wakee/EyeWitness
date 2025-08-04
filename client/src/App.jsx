import React, { useEffect, useState } from "react";
import { Header, Footer, LoadingComponent } from "./components/index";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/me`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Not logged in");

      const data = await response.json();
      dispatch(login(data));
    } catch (err) {
      dispatch(logout());
      console.error("User fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-50 font-rubik">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-50 font-rubik">
      <div className="w-full block">
        <Header />
        <main>
          <LoadingComponent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
