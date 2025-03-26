"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black bg-opacity-80 p-4 flex flex-wrap justify-between items-center z-50">
        <h1 className="text-3xl font-bold text-red-600">Anime Hub</h1>
        <nav className="w-full sm:w-auto flex justify-center sm:justify-end space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#comments" className="hover:text-gray-300">Comments</a>
          <a href="#sections" className="hover:text-gray-300">Anime List</a>
          <button 
            onClick={() => router.push("/Login-Page")} 
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0">
          <Image src={images[currentIndex]} alt="Anime Background" layout="fill" objectFit="cover" className="opacity-50" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Welcome to Anime Hub</h2>
          <p className="text-lg mb-6">Your ultimate anime tracking platform</p>
          <button className="bg-red-600 px-6 py-3 text-lg rounded hover:bg-red-700">
            Explore Now
          </button>
        </div>
      </section>

      {/* Anime Sections with Scrollable Cards & Animation */}
      <section id="sections" className="py-10 px-6 max-w-7xl mx-auto">
        {["Currently Airing", "Popular", "Latest Completed"].map((category, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="relative">
              <div className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth p-2">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-3 flex flex-col items-center text-center flex-none w-[220px] h-[350px] transition-transform duration-300 hover:scale-105 hover:shadow-xl mx-4">
                    <Image src={`/${category.replace(/\s+/g, '').toLowerCase()}${index + 1}.jpg`} alt={category} width={200} height={280} className="rounded-lg object-cover" />
                    <h3 className="text-lg font-semibold mt-2">Anime {index + 1}</h3>
                    <p className="text-sm text-gray-300">Exciting anime series with great storyline and animation.</p>
                    <button className="mt-2 bg-red-600 px-4 py-2 text-sm rounded hover:bg-red-700">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Comments Section */}
      <section id="comments" className="py-10 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">💬 Comments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">User {index + 1}</h3>
              <p className="text-gray-300">This anime was amazing! I really enjoyed the story and animation.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 px-4">
        <p>&copy; {new Date().getFullYear()} Anime Hub. All rights reserved.</p>
      </footer>
    </main>
  );
}