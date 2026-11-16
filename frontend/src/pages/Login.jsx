import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Login success:", response.data);

      // save token
      localStorage.setItem("token", response.data.token);
      alert("Login successfull");
      navigate("/dashboard");
    } catch (error) {
      console.log("Login error:", error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-x1 shadow-2xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-2">
          AI Resume Analyzer
        </h1>
        <p className="text-center text-gray-600 mb-6">Sign in to continue</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 p-2"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:underline">
            {" "}
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
