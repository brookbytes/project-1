"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import AnimatePresence

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <AnimatePresence mode="wait">
      {/* ✅ Navbar Animation on Refresh */}
      <motion.header
        key="navbar"
        initial={{ opacity: 0, y: -20 }} // Navbar fades & slides in
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          fontFamily: "monospace",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          padding: "10px 20px",
          zIndex: "100",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#1a1a1a",
          color: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          height: "55px",
        }}
      >
        <div className="flex items-center w-full justify-between">
          <nav className="hidden sm:flex items-center w-full justify-end">
            {[
              { name: "Home", link: "/Landing-page" },
              { name: "Notifications", link: "#notifications", icon: <Bell size={20} className="mr-2" /> },
              { name: "Profile", link: "/Signup-Page", icon: <User size={20} className="mr-2" /> },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className="text-md flex items-center"
                style={{
                  marginRight: "24px",
                  color: "white",
                  fontFamily: "monospace",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.1, color: "#FFD700" }} // ✅ Smooth Hover Effect
                transition={{ duration: 0.2 }}
              >
                {item.icon} {item.name}
              </motion.a>
            ))}

            {/* Logout Button with Animation */}
            <motion.button
              onClick={() => router.push("/Login-Page")}
              className="text-md px-5 py-1 rounded-lg flex items-center"
              style={{
                background: "var(--red-dark)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
              whileHover={{ scale: 1.1, backgroundColor: "#FF4136" }} // ✅ Hover Effect
              transition={{ duration: 0.2 }}
            >
              <LogOut size={18} className="mr-2" /> Logout
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="sm:hidden" style={{ color: "white" }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* ✅ Mobile Navigation Menu Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="absolute top-full right-0 w-full flex flex-col items-center space-y-5 py-5 border-t sm:hidden"
              style={{
                background: "#222",
                borderColor: "#444",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {[
                { name: "Home", link: "/Landing-page" },
                { name: "Notifications", link: "#notifications", icon: <Bell size={20} className="mr-2" /> },
                { name: "Profile", link: "#profile", icon: <User size={20} className="mr-2" /> },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  className="text-md flex items-center"
                  style={{ color: "white", textDecoration: "none" }}
                  whileHover={{ scale: 1.1, color: "#FFD700" }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon} {item.name}
                </motion.a>
              ))}

              <motion.button
                onClick={() => router.push("/Login-Page")}
                className="text-md px-5 py-1 rounded-lg flex items-center"
                style={{
                  background: "var(--red-dark)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.1, backgroundColor: "#FF4136" }}
                transition={{ duration: 0.2 }}
              >
                <LogOut size={18} className="mr-2" /> Logout
              </motion.button>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
}
