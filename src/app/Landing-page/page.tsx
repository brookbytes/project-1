"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
}

interface ApiResponse {
  data: Anime[];
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentlyAiring, setCurrentlyAiring] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [upcomingAnime, setUpcomingAnime] = useState<Anime[]>([]);

  const scrollRefs = {
    airing: useRef<HTMLDivElement>(null),
    popular: useRef<HTMLDivElement>(null),
    upcoming: useRef<HTMLDivElement>(null),
  };

  const removeDuplicates = (animeList: Anime[]): Anime[] => {
    const seen = new Set<number>();
    return animeList.filter((anime) => {
      if (seen.has(anime.mal_id)) return false;
      seen.add(anime.mal_id);
      return true;
    });
  };

  const fetchAnimeData = async () => {
    try {
      const [resAiring, resPopular, resUpcoming] = await Promise.all([
        fetch("https://api.jikan.moe/v4/top/anime?filter=airing"),
        fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity"),
        fetch("https://api.jikan.moe/v4/top/anime?filter=upcoming"),
      ]);

      const dataAiring: ApiResponse = await resAiring.json();
      const dataPopular: ApiResponse = await resPopular.json();
      const dataUpcoming: ApiResponse = await resUpcoming.json();

      setCurrentlyAiring(removeDuplicates(dataAiring.data).slice(0, 15));
      setPopularAnime(removeDuplicates(dataPopular.data).slice(0, 15));
      setUpcomingAnime(removeDuplicates(dataUpcoming.data).slice(0, 15));
    } catch (error) {
      console.error("Error fetching anime data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  const scrollSpeeds: Record<string, string> = {
    airing: "60s",
    popular: "75s",
    upcoming: "65s",
  };

  const animeSections = [
    {
      key: "airing",
      title: "Currently Airing",
      data: currentlyAiring,
      animateClass: "animate-scroll-ltr",
      ref: scrollRefs.airing,
    },
    {
      key: "popular",
      title: "Popular",
      data: popularAnime,
      animateClass: "animate-scroll-ltr", // 👈 CHANGED TO LTR
      ref: scrollRefs.popular,
    },
    {
      key: "upcoming",
      title: "Upcoming",
      data: upcomingAnime,
      animateClass: "animate-scroll-ltr",
      ref: scrollRefs.upcoming,
    },
  ];

  const handlePause = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) ref.current.style.animationPlayState = "paused";
  };

  const handleResume = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) ref.current.style.animationPlayState = "running";
  };

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-[60vh] flex flex-col justify-center items-center text-center px-4 mt-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to <span className="text-red-500">Anime Hub</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl mt-5 drop-shadow-md">
          Your ultimate anime tracking platform.
        </p>
      </section>

      {/* Placeholder Section */}
      <section className="max-w-[1062px] mx-auto px-6 sm:px-10 py-20 border border-gray-700 rounded-xl bg-gray-900 my-10 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">To Be Added</h2>
        <p className="text-gray-400">This section is reserved for future content.</p>
      </section>

      {/* Anime Sections */}
      <section className="max-w-[1062px] mx-auto px-6 sm:px-10 py-12 space-y-24 border border-gray-700 rounded-xl bg-gray-900 mb-20 shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-opacity-75"></div>
          </div>
        ) : (
          animeSections.map((section) => (
            <div key={section.key}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{section.title}</h2>

              <div
                className="relative overflow-x-auto hide-scrollbar group cursor-grab active:cursor-grabbing"
                onMouseEnter={() => handlePause(section.ref)}
                onMouseLeave={() => handleResume(section.ref)}
                onTouchStart={() => handlePause(section.ref)}
                onTouchEnd={() => handleResume(section.ref)}
              >
                <div
                  ref={section.ref}
                  className={`flex gap-6 w-max ${section.animateClass} group-hover:animate-none`}
                  style={{ animationDuration: scrollSpeeds[section.key] }}
                >
                  {[...section.data, ...section.data].map((anime, index) => (
                    <Link
                      href={`/anime/${anime.mal_id}`}
                      key={`${anime.mal_id}-${index}`}
                      aria-label={`View details for ${anime.title}`}
                    >
                      <div className="w-[150px] h-[220px] relative transform hover:scale-105 transition duration-300 cursor-pointer">
                        <Image
                          src={anime.images.webp.image_url}
                          alt={anime.title}
                          fill
                          className="rounded-lg object-cover"
                          loading="lazy"
                        />
                        <p className="text-sm mt-2 text-center truncate">{anime.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Scroll Animations + Scrollbar Hide */}
      <style jsx global>{`
        @keyframes scroll-ltr {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-ltr {
          animation: scroll-ltr linear infinite;
        }

        .hide-scrollbar {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .group:hover .group-hover\\:animate-none {
          animation: none !important;
        }
      `}</style>
    </main>
  );
}
