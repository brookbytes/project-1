"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Correct import for Next.js App Router

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Header & Navigation */}
      <header className="w-full bg-[#121212] shadow-md py-4 px-6 flex justify-between items-center border-b-2 border-[#A020F0]">
        <h1 className="text-2xl font-bold text-[#00AEEF]">Anime Hub</h1>
        <input 
          type="text" 
          placeholder="Search Anime..." 
          className="px-6 py-2 w-1/3 border rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />
        <ul className="flex space-x-6 font-semibold">
          <li><a href="#" className="text-[#00AEEF] hover:text-[#A020F0] transition">Home</a></li>
          <li><a href="#comments" className="text-[#00AEEF] hover:text-[#A020F0] transition">Comments</a></li>
          <li><a href="#sections" className="text-[#00AEEF] hover:text-[#A020F0] transition">Anime List</a></li>
          {/* Fixed Login Button with Correct Path */}
          <li>
            <button 
              onClick={() => router.push("./Login-Page")} 
              className="bg-[#00AEEF] text-black px-4 py-2 rounded-lg hover:bg-[#A020F0] hover:text-white transition"
            >
              Login
            </button>
          </li>
        </ul>
      </header>

      {/* Image Slider */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <Image key={index} src={image} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
          ))}
        </div>
        <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#00AEEF] text-black p-2 rounded-full hover:bg-[#A020F0] hover:text-white">◀</button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00AEEF] text-black p-2 rounded-full hover:bg-[#A020F0] hover:text-white">▶</button>
      </section>

      {/* Comments Section */}
      <section id="comments" className="py-10 text-center">
        <h2 className="text-2xl font-bold text-[#00AEEF] mb-6">💬 Comments</h2>
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="min-w-[250px] p-4 bg-[#1E1E1E] rounded-lg shadow-md border-l-4 border-[#A020F0]">
              <h3 className="text-lg font-semibold text-[#00AEEF]">User {index + 1}</h3>
              <p className="text-white">This anime was amazing! I really enjoyed the story and animation.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Anime Sections */}
      <section id="sections" className="py-10 max-w-7xl mx-auto">
        {['Currently Airing', 'Popular', 'Latest Completed'].map((category, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-2xl font-bold text-[#00AEEF] mb-4">{category}</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {[...Array(5)].map((_, index) => (
                <Image key={index} src={`/${category.replace(/\s+/g, '').toLowerCase()}${index + 1}.jpg`} alt={`${category} Anime ${index + 1}`} width={400} height={250} className="rounded-lg shadow-md border-2 border-[#A020F0]" />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} Anime Hub. All rights reserved.</p>
      </footer>
    </main>
  );
}
