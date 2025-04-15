"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Bell, User, LogOut, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState("all"); // Filter state
  const menuRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const animeResponse = await fetch(
        `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
          searchQuery
        )}&page[limit]=10`
      );
      const animeData = await animeResponse.json();

      const characterResponse = await fetch(
        `https://kitsu.io/api/edge/characters?filter[name]=${encodeURIComponent(
          searchQuery
        )}&page[limit]=10`
      );
      const characterData = await characterResponse.json();

      const combinedResults = [
        ...(animeData.data || []).map((anime) => ({
          type: "anime",
          id: anime.id,
          title: anime.attributes.titles.en || anime.attributes.titles.ja_jp,
          thumbnail: anime.attributes.posterImage?.small,
          subtype: anime.attributes.subtype, // To filter OVAs
        })),
        ...(characterData.data || []).map((character) => ({
          type: "character",
          id: character.id,
          name: character.attributes.name,
          thumbnail: character.attributes.image?.original,
          affiliatedAnime: character.relationships.mediaCharacters.links.related,
        })),
      ];

      // Apply filter
      const filteredResults = combinedResults.filter((result) => {
        if (filter === "all") return true;
        if (filter === "anime") return result.type === "anime";
        if (filter === "character") return result.type === "character";
        if (filter === "ova") return result.type === "anime" && result.subtype === "OVA";
        return true;
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
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
        <div className="flex items-center w-full justify-between gap-4">
          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-md relative"
          >
            <div className="relative w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime, characters, or OVAs..."
                className="w-full bg-gray-800/50 text-white rounded-lg pl-4 pr-10 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700/30"
                style={{ fontFamily: "monospace" }}
              />
              <motion.button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
            </div>
            {/* Filter Icon Button */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <button
                className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  const filterMenu = document.getElementById("filter-menu");
                  if (filterMenu) {
                    filterMenu.classList.toggle("hidden");
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.414 5.414a1 1 0 00-.293.707V17a1 1 0 01-.293.707l-2 2A1 1 0 0111 19v-4.172a1 1 0 00-.293-.707L5.293 6.707A1 1 0 015 6V4z"
                  />
                </svg>
              </button>
              {/* Filter Menu */}
              <div
                id="filter-menu"
                className="hidden absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded-lg shadow-lg z-50"
              >
                <ul className="divide-y divide-gray-700">
                  <li
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => setFilter("all")}
                  >
                    All
                  </li>
                  <li
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => setFilter("anime")}
                  >
                    Anime
                  </li>
                  <li
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => setFilter("character")}
                  >
                    Characters
                  </li>
                  <li
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => setFilter("ova")}
                  >
                    OVAs
                  </li>
                </ul>
              </div>
            </div>
          </motion.form>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg z-50">
              <ul className="divide-y divide-gray-700">
                {searchResults.map((result) => (
                  <li
                    key={result.id}
                    className="p-2 flex items-center gap-4 hover:bg-gray-700 cursor-pointer"
                    onClick={() =>
                      result.type === "anime"
                        ? router.push(`/anime/${result.id}`)
                        : null
                    }
                  >
                    <img
                      src={result.thumbnail}
                      alt={result.type === "anime" ? result.title : result.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      {result.type === "anime" ? (
                        <p className="text-sm font-medium">{result.title}</p>
                      ) : (
                        <>
                          <p className="text-sm font-medium">{result.name}</p>
                          <p className="text-xs text-gray-400">
                            {result.affiliatedAnime}
                          </p>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isSearching && (
            <div className="absolute top-full mt-2 w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg z-50 p-2">
              Searching...
            </div>
          )}

          <nav className="hidden sm:flex items-center justify-end">
            {[
              { name: "Home", link: "/Landing-page" },
              {
                name: "Notifications",
                link: "#notifications",
                icon: <Bell size={20} className="mr-2" />,
              },
              {
                name: "Profile",
                link: "/Signup-Page",
                icon: <User size={20} className="mr-2" />,
              },
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
                whileHover={{ scale: 1.1, color: "red" }} // ✅ Smooth Hover Effect
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

        {/* Mobile Navigation Menu */}
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
              {/* Mobile Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                className="w-full px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative w-full">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search anime, characters, or OVAs..."
                    className="w-full bg-gray-800/50 text-white rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700/30"
                    style={{ fontFamily: "monospace" }}
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.form>
              {[
                { name: "Home", link: "/Landing-page" },
                {
                  name: "Notifications",
                  link: "#notifications",
                  icon: <Bell size={20} style={{ marginRight: "10px" }} />,
                },
                {
                  name: "Profile",
                  link: "/Signup-Page",
                  icon: <User size={20} style={{ marginRight: "10px" }} />,
                },
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
                  whileHover={{
                    scale: 1.08,
                    color: "#FFD700",
                    backgroundColor: "#333",
                  }} // ✅ Smooth hover effect
                  transition={{ duration: 0.2 }}
                >
                  {item.icon} {item.name}
                </motion.a>
              ))}

              {/* Logout Button */}
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
              </motion.button>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
}
