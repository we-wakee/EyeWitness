import React, { useState } from "react";
import { Button, Input, Logo } from "./index";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (data) => {
    setError("");
    console.log("Submitting data:", data); // ✅ check if form submits
    try {
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Signup failed");
      }

      dispatch(login(result));
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleSignup)} className="mt-6">
          <div className="space-y-5">
            <div>
              <Input
                label="First Name:"
                type="text"
                placeholder="Enter your first name"
                {...register("firstname", { required: "First name is required" })}
              />
              {errors.firstname && (
                <p className="text-sm text-red-600">{errors.firstname.message}</p>
              )}
            </div>

            <div>
              <Input
                label="Last Name:"
                type="text"
                placeholder="Enter your last name"
                {...register("lastname", { required: "Last name is required" })}
              />
              {errors.lastname && (
                <p className="text-sm text-red-600">{errors.lastname.message}</p>
              )}
            </div>

            <div>
              <Input
                label="Email:"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64}/,
                    message:
                      "Password must include upper, lower, number, symbol and be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
