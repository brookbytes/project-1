"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [currentlyAiring, setCurrentlyAiring] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [latestCompleted, setLatestCompleted] = useState<Anime[]>([]);

  // 🔧 Helper to remove duplicate mal_id entries
  interface Anime {
    mal_id: number;
    title: string;
    images: {
      webp: {
        image_url: string;
      };
    };
  }

  const removeDuplicates = (animeList: Anime[]): Anime[] => {
    const seen = new Set<number>();
    return animeList.filter((anime) => {
      if (seen.has(anime.mal_id)) return false;
      seen.add(anime.mal_id);
      return true;
    });
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const resAiring = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing");
        const resPopular = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
        const resCompleted = await fetch("https://api.jikan.moe/v4/top/anime?filter=upcoming");

        const dataAiring = await resAiring.json();
        const dataPopular = await resPopular.json();
        const dataCompleted = await resCompleted.json();

        setCurrentlyAiring(removeDuplicates(dataAiring.data).slice(0, 10));
        setPopularAnime(removeDuplicates(dataPopular.data).slice(0, 10));
        setLatestCompleted(removeDuplicates(dataCompleted.data).slice(0, 10));
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchAnimeData();
  }, []);

  const animeSections = [
    { title: "Currently Airing", data: currentlyAiring },
    { title: "Popular", data: popularAnime },
    { title: "Upcoming", data: latestCompleted },
  ];

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* ✅ Hero Section */}
      <section 
        className="w-full h-screen flex items-center justify-center bg-cover bg-center mt-16"
        style={{
          backgroundImage: "url('https://cdn.myanimelist.net/images/anime/1015/138006.jpg')",
        }}
      >
        <div className="flex items-center justify-center h-screen text-center">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              Welcome to <span className="text-red-500">Anime Hub</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mt-5 drop-shadow-md">
              Your ultimate anime tracking platform.
            </p>
            <button className="mt-5 bg-white text-black px-6 py-3 text-lg font-semibold rounded-lg hover:bg-gray-300 transition">
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Anime Sections */}
      <section className="py-10 px-4 md:px-12 max-w-7xl mx-auto mt-8">
        {animeSections.map((section) => (
          <div key={section.title} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
              {section.data.map((anime) => (
                <Link href={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <div className="w-40 flex-none transform transition duration-300 hover:scale-105 cursor-pointer">
                    <Image
                      src={anime.images.webp.image_url}
                      alt={anime.title}
                      width={160}
                      height={230}
                      className="rounded-lg object-cover"
                    />
                    <p className="text-sm mt-2">{anime.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
