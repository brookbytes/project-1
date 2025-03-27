"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const scrollContainerRef = useRef(null);
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"]; // ✅ Placeholder images
  const [currentIndex, setCurrentIndex] = useState(0); // ✅ Initial state for index

  // ✅ Drag Scroll Logic (Fixed)
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const startDragging = (e) => {
      isDown = true;
      startX = e.pageX || e.touches[0].pageX;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX;
      const walk = (x - startX) * 1.5;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const stopDragging = () => {
      isDown = false;
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
      {/* ✅ Hero Section */}
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
        >
          <Image
            src={images[currentIndex]} // ✅ Uses the state value
            alt="Anime Background"
            layout="fill"
            objectFit="cover"
            style={{ opacity: 0.5 }}
          />
        </div>
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
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* ✅ Anime Sections */}
      <section
        id="sections"
        className="py-10 px-6 max-w-7xl mx-auto"
        style={{
          fontFamily: "monospace, 'Courier New', Courier, Consolas",
          marginTop: "48px",
          minHeight: "700px",
          overflow: "hidden",
        }}
      >
        {["Currently Airing", "Popular", "Latest Completed"].map((category, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>

            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scroll-smooth touch-scroll ultra-slim-scrollbar draggable-scroll"
                style={{
                  gap: "20px",
                  padding: "10px",
                  paddingBottom: "10px",
                  scrollSnapType: "x proximity",
                  WebkitOverflowScrolling: "touch",
                  cursor: "grab",
                  touchAction: "pan-x",
                  overflowX: "auto",
                }}
              >
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center text-center flex-none transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      width: "187px",
                      height: "298px",
                      fontFamily: "monospace, 'Courier New', Courier, Consolas",
                      scrollSnapAlign: "center",
                      border: "2px solid transparent",
                      transform: "translateZ(0)",
                    }}
                  >
                    <Image
                      src={`/image${index + 1}.jpg`}
                      alt="Anime Image"
                      width={170}
                      height={238}
                      className="rounded-lg object-cover"
                    />
                    <h3 className="text-lg font-semibold mt-2">Anime {index + 1}</h3>
                    <p className="text-sm text-gray-300">
                      Exciting anime series with great storyline and animation.
                    </p>
                    <button className="mt-2 bg-red-600 px-4 py-2 text-sm rounded hover:bg-red-700">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ✅ Custom Scrollbar Styles */}
      <style>
        {`
          .ultra-slim-scrollbar::-webkit-scrollbar {
            height: 3px;
            width: 3px;
          }

          .ultra-slim-scrollbar::-webkit-scrollbar-thumb {
            background: red;
            border-radius: 10px;
          }

          .ultra-slim-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .touch-scroll {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }

          .draggable-scroll {
            overflow-x: auto;
            cursor: grab;
            user-select: none;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x;
          }

          .draggable-scroll:active {
            cursor: grabbing;
          }
        `}
      </style>
    </main>
  );
}
