"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("⚠️ All fields are required!");
      return;
    }

    if (password.length < 6) {
      setError("🔒 Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    // Save user credentials (Mock Database - localStorage)
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    
    setSuccess("✅ Account created successfully! Redirecting to login...");

    // ✅ Navigate to Login Page after 2.5 sec
    setTimeout(() => {
      router.push("/login");
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mt-2">{success}</p>}

        <form onSubmit={handleSignup} className="space-y-4 mt-4">
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
              placeholder="Enter a strong password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* 🔹 Navigate to Login Page */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("./Login-Page")} // Navigate to Login Page
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
