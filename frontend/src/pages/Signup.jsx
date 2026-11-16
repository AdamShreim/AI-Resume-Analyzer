import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/client";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //handle Signup
  const handleSignup = async (e) => {
    e.preventDefault(); // prevents page reload
    try {
      const res = await apiClient.post("/api/auth/signup", {
        email: email.trim(),
        password: password.trim(),
      });
      console.log("Signup success:", res.data);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.log("Signup error : ", err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className=" min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <h1 className="font-bold text-3xl mb-2 text-center">
          AI Resume Analyzer
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Create your new acoount
        </p>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-600 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 p-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Create your password"
              className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 rounded-lg w-full p-2 text-white hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
