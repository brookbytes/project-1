"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("⚠️ Email and Password are required!");
      return;
    }

    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("storage")); // 🔹 Update across all pages
      router.push("/dashboard"); // Redirect after login
    } else {
      setError("❌ Invalid email or password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 relative">
      {/* 🔹 Back Button in Top-Left */}
      <button
        onClick={() => router.push("/")} // Navigate to Home Page
        className="absolute top-4 left-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
      >
        ← Back to Home
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        {/* 🔹 Navigate to Sign Up Page */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("./Signup-Page")} // Navigate to Sign Up Page
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
