"use client";

import { useEffect, useState ,useRef} from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import AnimatePresence
import { href } from "react-router-dom";


export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef(null); // ✅ Define menuRef

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
      { name: "Visit Brook", link: "https://www.brookbytes.site", icon: <User size={20} className="mr-2" /> },
    ].map((item, index) => (
      <motion.a
        key={index}
        href={item.link}
        target={item.link.startsWith("http") ? "_blank" : "_self"} // Open external links in new tab
        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-md flex items-center"
        style={{
          marginRight: "24px",
          color: "white",
          fontFamily: "monospace",
          textDecoration: "none",
        }}
        whileHover={{ scale: 1.1, color: "red" }}
        transition={{ duration: 0.2 }}
      >
        {item.icon} {item.name}
      </motion.a>
    ))}



          {/* Logout Button with Animation 
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
            </motion.button>*/}
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
       ref={menuRef}
       style={{
         position: "absolute",
         top: "100%",
         right: "0",
         width: "100%",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         gap: "15px",
         padding: "20px 0",
         background: "#222",
         borderTop: "1px solid #444",
         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
         zIndex: "9999", // ✅ Always above everything
         borderRadius: "8px",
       }}
       initial={{ opacity: 0, y: -20 }} // ✅ Smoother animation
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -20 }}
       transition={{ duration: 0.4, ease: "easeInOut" }}
     >
       {[
         { name: "Home", link: "/Landing-page" },
         { name: "Notifications", link: "#notifications", icon: <Bell size={20} style={{ marginRight: "10px" }} /> },
         { name: "Visit brook",  link: "https://www.brookbytes.site", icon: <User size={20} style={{ marginRight: "10px" }} /> },
       ].map((item, index) => (
         <motion.a
           key={index}
           href={item.link}
           style={{
             fontSize: "16px",
             fontWeight: "500",
             display: "flex",
             alignItems: "center",
             color: "white",
             textDecoration: "none",
             padding: "12px 18px",
             borderRadius: "8px",
             transition: "all 0.3s ease-in-out",
           }}
           whileHover={{ scale: 1.08, color: "#FFD700", backgroundColor: "#333" }} // ✅ Smooth hover effect
           transition={{ duration: 0.2 }}
         >
           {item.icon} {item.name}
         </motion.a>
       ))}

       {/* Logout Button
       <motion.button
         onClick={() => router.push("/Login-Page")}
         style={{
           padding: "12px 20px",
           background: "#D32F2F",
           color: "white",
           border: "none",
           borderRadius: "8px",
           cursor: "pointer",
           display: "flex",
           alignItems: "center",
           fontSize: "16px",
           fontWeight: "500",
           transition: "all 0.3s ease-in-out",
         }}
         whileHover={{ scale: 1.1, backgroundColor: "#FF4136" }} // ✅ Hover effect
         transition={{ duration: 0.2 }}
       >
         <LogOut size={18} style={{ marginRight: "10px" }} /> Logout
       </motion.button> */}
     </motion.nav>
  )}
</AnimatePresence>

      </motion.header>
    </AnimatePresence>
  );
}
