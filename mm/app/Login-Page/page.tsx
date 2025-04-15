"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./login.css"; // Import login-specific styles

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures styles are only applied on the client-side
    setIsClient(true);
  }, []);

  return (
    <section className={isClient ? "login-page" : ""}>
      {/* Animated Background Blocks */}
      {[...Array(196)].map((_, i) => (
        <span key={i}></span>
      ))}

<div className="login">
  <div className="content">
    <div className="title"><b>Login</b></div>
    <br />
    <form className="form">
      {/* Username Field */}
      <div className="inputBox">
        <input
          type="text"
          required
          placeholder="Enter Username"
         
        />
      </div>
      <br />
      {/* Password Field */}
      <div className="inputBox">
        <input
          type="password"
          required
          placeholder="Enter Password"
          
        />
      </div>
    <br />
      {/* Links (Forgot Password & Signup) */}
      <div className="links">
        <Link href="#" className="hover:text-blue-500 transition">
          Forgot Password?
        </Link>
        
        <Link href="./Signup-Page" className="hover:text-blue-500 transition">
          Signup
        </Link>
      <br />
        <Link href="./Landing-page" className=" links hover:text-blue-500 transition">
            Back to Home !!!
        </Link>
        
      </div>
      

      {/* Submit Button */}
      <div className="button">
        <input
          type="submit"
          value="Login"
          className="w-full h-12 p-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-green-700 transition"
        />
      </div>
    </form>
  </div>
</div>

    </section>
  );
}

