"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const scrollContainerRef = useRef(null);
  const [animeData, setAnimeData] = useState({
    "Currently Airing": [],
    Popular: [],
    "Latest Completed": [],
  });

  // Fetch anime data from Jikan API
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const categories = {
          "Currently Airing": "airing",
          Popular: "bypopularity",
          "Latest Completed": "upcoming",
        };

        const data = await Promise.all(
          Object.entries(categories).map(async ([key, endpoint]) => {
            const response = await fetch(
              `https://api.jikan.moe/v4/top/anime?filter=${endpoint}&limit=10`
            );
            const result = await response.json();
            return { [key]: result.data };
          })
        );

        setAnimeData(Object.assign({}, ...data));
      } catch (error) {
        console.error("Failed to fetch anime data:", error);
      }
    };

    fetchAnimeData(); // Initial fetch

    const intervalId = setInterval(fetchAnimeData, 600000); // Update every 10 minutes

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Drag Scroll Logic
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    const startDragging = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      if (e instanceof MouseEvent) {
        startX = e.pageX - scrollContainer.offsetLeft;
      } else if (e instanceof TouchEvent) {
        startX = e.touches[0].pageX - scrollContainer.offsetLeft;
      }
      scrollLeft = scrollContainer.scrollLeft;
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      let x: number;
      if (e instanceof MouseEvent) {
        x = e.pageX - scrollContainer.offsetLeft;
      } else if (e instanceof TouchEvent) {
        x = e.touches[0].pageX - scrollContainer.offsetLeft;
      }
      const walk = (x - startX) * 1.5;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const stopDragging = () => {
      isDragging = false;
    };

    scrollContainer.addEventListener("mousedown", startDragging);
    scrollContainer.addEventListener("touchstart", startDragging);
    scrollContainer.addEventListener("mousemove", onMove);
    scrollContainer.addEventListener("touchmove", onMove);
    scrollContainer.addEventListener("mouseup", stopDragging);
    scrollContainer.addEventListener("mouseleave", stopDragging);
    scrollContainer.addEventListener("touchend", stopDragging);

    return () => {
      scrollContainer.removeEventListener("mousedown", startDragging);
      scrollContainer.removeEventListener("touchstart", startDragging);
      scrollContainer.removeEventListener("mousemove", onMove);
      scrollContainer.removeEventListener("touchmove", onMove);
      scrollContainer.removeEventListener("mouseup", stopDragging);
      scrollContainer.removeEventListener("mouseleave", stopDragging);
      scrollContainer.removeEventListener("touchend", stopDragging);
    };
  }, []);

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 16px",
          marginTop: "37.8px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "640px",
            fontFamily: "monospace, 'Courier New', Courier, Consolas",
            letterSpacing: "0.5px",
          }}
        >
          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              marginBottom: "16px",
              fontFamily: "monospace, 'Courier New', Courier, Consolas",
              whiteSpace: "pre-wrap",
            }}
          >
            Welcome to Anime Hub
          </h2>

          <p style={{ fontSize: "1.125rem", marginBottom: "24px" }}>
            Your ultimate anime tracking platform
          </p>
          <button
            style={{
              backgroundColor: "#dc2626",
              padding: "12px 24px",
              fontSize: "1.125rem",
              borderRadius: "8px",
              transition: "background 0.3s ease",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontFamily: "monospace, 'Courier New', Courier, Consolas",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#b91c1c")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#dc2626")
            }
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Anime Sections */}
      <section
        id="sections"
        className="py-10 px-6 max-w-7xl mx-auto space-y-12"
      >
        {Object.entries(animeData).map(([category, animes], i) => (
          <div key={i} className="mb-8">
            <h2 className="text-2xl font-bold mb-6 pl-4">{category}</h2>
            <div
              ref={scrollContainerRef}
              className="grid grid-flow-col auto-cols-max gap-6 overflow-x-auto pb-6 px-4 scroll-smooth touch-scroll ultra-slim-scrollbar"
              style={{
                scrollSnapType: "x mandatory",
                scrollPadding: "0 24px",
              }}
            >
              {animes && animes.length > 0 ? (
                animes.map((anime, index) => (
                  <div
                    key={index}
                    className="group w-[180px] bg-gray-800/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/20 hover:shadow-xl border border-gray-700/30"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        fill
                        className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                        sizes="180px"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-3 flex flex-col min-h-[120px] justify-between">
                      <div>
                        <h3 className="font-semibold text-sm mb-1.5 line-clamp-2 text-gray-100 leading-tight">
                          {anime.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                          {anime.synopsis?.substring(0, 70) ||
                            "No synopsis available."}
                          ...
                        </p>
                      </div>
                      <button className="w-full bg-red-600/80 py-1.5 text-xs font-medium rounded-md hover:bg-red-600 transition-colors duration-200 backdrop-blur-sm mt-3">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No data available.</p>
              )}
            </div>
          </div>
        ))}
      </section>

      <style jsx global>{`
        .ultra-slim-scrollbar::-webkit-scrollbar {
          height: 4px;
        }

        .ultra-slim-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .ultra-slim-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        .ultra-slim-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .touch-scroll {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}
