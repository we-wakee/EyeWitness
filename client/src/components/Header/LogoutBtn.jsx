import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      // Hit Express logout endpoint
      await axios.post("/api/logout", {}, { withCredentials: true });

      // Clear auth state in Redux
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
