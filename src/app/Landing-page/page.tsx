"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const images = [
    { src: "/image1.jpg", number: 1 },
    { src: "/image2.jpg", number: 2 },
    { src: "/image3.jpg", number: 3 },
    { src: "/image4.jpg", number: 4 },
    { src: "/image5.jpg", number: 5 }
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
     
      <header className="w-full bg-[#121212]/95 backdrop-blur-sm shadow-lg py-6 px-8 flex flex-col sm:flex-row justify-between items-center border-b-2 border-[#A020F0] gap-6 sticky top-0 z-50 min-h-[80px]">
        
        <h1 className="text-3xl font-extrabold text-[#00AEEF] text-center tracking-tight">
          <span className="bg-gradient-to-r from-[#00AEEF] to-[#A020F0] bg-clip-text text-transparent">
            Anime Hub
          </span>
        </h1>

        
        <div className="relative w-full sm:w-2/5 mx-0 sm:mx-8">
          <input
            type="text"
            placeholder="Search Anime..."
            className="px-6 py-3.5 w-full border-2 border-[#00AEEF]/30 rounded-xl bg-black/70 text-white focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent pr-14 transition-all duration-300 text-lg"
          />
          <svg
            className="absolute right-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#00AEEF] hover:text-[#A020F0] cursor-pointer transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <ul className="flex flex-wrap  justify-center sm:justify-end items-center gap-6 sm:gap-8 font-semibold">
          <li>
            <a href="#" className="text-lg text-[#00AEEF] hover:text-[#A020F0] px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#00AEEF]/10">
              Home
            </a>
          </li>
          <li>
            <a href="#comments" className="text-lg text-[#00AEEF] hover:text-[#A020F0] px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#00AEEF]/10">
              Comments
            </a>
          </li>
          <li>
            <a href="#sections" className="text-lg text-[#00AEEF] hover:text-[#A020F0] px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#00AEEF]/10">
              Anime List
            </a>
          </li>
          <li className="ml-2 sm:ml-4">
            <button
              onClick={() => router.push("/Login-Page")}
              className="text-xl bg-[#00AEEF] text-black px-8 py-2 rounded-xl hover:bg-[#A020F0] hover:text-white transition-all duration-300 font-bold shadow-lg hover:shadow-[#A020F0]/50 transform hover:scale-105"
            >
              Login
            </button>
            <br/>
          </li>
        </ul>
      </header>
      <br/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Spotlight Section */}
        <section className="px-4 py-6 max-w-7xl mx-auto w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-[#00AEEF] mb-4">
            #{images[currentIndex].number} Spotlight
          </h2>
          <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#A020F0]">
            <h3 className="text-lg font-bold mb-6">
              Featured Anime {images[currentIndex].number}
            </h3>
          </div>
        </section>

        {/* Image Slider */}
        <section className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden">
          <div
            role="group"
            aria-live="polite"
            className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 relative"
                aria-hidden={index !== currentIndex}
              >
                <Image
                  src={image.src}
                  alt={`Featured Anime ${image.number}`}
                  width={1920}
                  height={1080}
                  priority={index === 0}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#00AEEF] text-black p-3 rounded-full hover:bg-[#A020F0] hover:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#00AEEF] text-black p-3 rounded-full hover:bg-[#A020F0] hover:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            ▶
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-[#00AEEF] scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </section>
         
        <br />

         
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
        
        <br/>

        
        <section id="sections" className="py-10 px-4 max-w-7xl mx-auto">
          {['Currently Airing', 'Popular', 'Latest Completed'].map((category, i) => (
            <div key={i} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00AEEF] mb-4 text-center">{category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex justify-center">
                    <Image
                      src={`/${category.replace(/\s+/g, '').toLowerCase()}${index + 1}.jpg`}
                      alt={`${category} Anime ${index + 1}`}
                      width={300}
                      height={200}
                      className="rounded-lg shadow-md border-2 border-[#A020F0] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} Anime Hub. All rights reserved.</p>
      </footer>
    </main>
  );
}