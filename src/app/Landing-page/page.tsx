"use client";

import { useState, useEffect, useCallback } from "react";
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

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <main className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Header & Navigation */}
      <header className="w-full bg-[#121212] shadow-md py-4 px-6 flex flex-col sm:flex-row justify-between items-center border-b-2 border-[#A020F0] gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#00AEEF] text-center">Anime Hub</h1>
        <input 
          type="text" 
          placeholder="Search Anime..." 
          className="px-4 py-2 w-full sm:w-1/3 border rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-center"
        />
        <ul  className="flex flex-wrap justify-center sm:justify-end items-center gap-6 sm:gap-10 font-semibold">
  <li>
    <a href="#" className="text-[#00AEEF] hover:text-[#A020F0] transition">
      Home
    </a>
  </li>
  <li>
    <a href="#comments" className="text-[#00AEEF] hover:text-[#A020F0] transition">
      Comments
    </a>
  </li>
  <li>
    <a href="#sections" className="text-[#00AEEF] hover:text-[#A020F0] transition">
      Anime List
    </a>
  </li>
  <li className="ml-6 sm:ml-10">
    <button 
      onClick={() => router.push("/Login-Page")} 
      className="bg-[#00AEEF] text-black px-6 py-2 rounded-lg hover:bg-[#A020F0] hover:text-white transition"
    >
      Login
    </button>
  

            
          </li>
        </ul>
      </header>

      {/* Image Slider */}
      <section className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="w-20 h-20 relative">
              <Image src={image} alt={`Slide ${index + 1}`} width={1920} height={1080} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#00AEEF] text-black p-3 rounded-full hover:bg-[#A020F0] hover:text-white shadow-lg">◀</button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#00AEEF] text-black p-3 rounded-full hover:bg-[#A020F0] hover:text-white shadow-lg">▶</button>
      </section>
      <br /><br /><br />

      {/* Comments Section */}
      <section id="comments" className="py-10 px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#00AEEF] mb-6">💬 Comments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-6 bg-[#1E1E1E] rounded-lg shadow-md border-l-4 border-[#A020F0] flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-[#00AEEF]">User {index + 1}</h3>
              <p className="text-white">This anime was amazing! I really enjoyed the story and animation.</p>
            </div>
          ))}
        </div>
      </section>
<br /><br /><br />
      {/* Anime Sections */}
      <section id="sections" className="py-10 px-4 max-w-7xl mx-auto">
        {['Currently Airing', 'Popular', 'Latest Completed'].map((category, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#00AEEF] mb-4 text-center">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-center">
                  <Image src={`/${category.replace(/\s+/g, '').toLowerCase()}${index + 1}.jpg`} alt={`${category} Anime ${index + 1}`} width={300} height={200} className="rounded-lg shadow-md border-2 border-[#A020F0] object-cover" />
                </div>
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
