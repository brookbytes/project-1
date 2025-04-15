"use client";

import { useState } from "react";
import Link from "next/link";
import "./signup.css"; // Import the separate CSS file

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Signing up with: ${name}, ${email}, ${username}`);
  };

  return (
    <section className="signup-page">
      {/* Animated Background Blocks */}
      {[...Array(196)].map((_, i) => (
        <span key={i}></span>
      ))}

      {/* Sign-up form */}
      <div className="signup-container">
        <div className="content">
          <h2>Sign Up</h2>
          <form className="form" onSubmit={handleSignup}>
            <div className="inputBox">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <i>Full Name</i>
            </div>
            <div className="inputBox">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <i>Password</i>
            </div>
            <div className="inputBox">
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <i>Confirm Password</i>
            </div>
            <div className="links">
              <Link href="./Login-Page">Already have an account? Login</Link>
            </div>
            <Link href="./Landing-page" className="links text-[white] hover:text-blue-500 transition">
            Back to Home !!!
        </Link>
            <div className="inputBox">
              <input type="submit" value="Sign Up" />
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
