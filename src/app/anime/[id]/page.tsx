'use client';

import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";

interface AnimeDetailsProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

async function getRelatedAnime(id: string) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.data.slice(0, 10);
}

export default function AnimeDetails({ params }: AnimeDetailsProps) {
  const [anime, setAnime] = useState<any>(null);
  const [relatedAnime, setRelatedAnime] = useState<any[]>([]);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 2, spacing: 15 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 24 },
      },
    },
  });

  useEffect(() => {
    async function fetchData() {
      const a = await getAnimeDetails(params.id);
      const related = await getRelatedAnime(params.id);
      setAnime(a);
      setRelatedAnime(related);
    }
    fetchData();
  }, [params.id]);

  if (!anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <p className="text-xl font-semibold animate-pulse">Loading anime details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white py-10 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-[1060px] bg-[#111] border border-gray-700 rounded-xl p-6 sm:p-8 shadow-lg space-y-16">

        {/* Anime Info */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative w-full max-w-[200px] h-[280px] mx-auto md:mx-0">
            <Image
              src={anime.images.jpg.image_url}
              alt={anime.title || "Anime Cover"}
              fill
              className="rounded-lg object-cover shadow-xl"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg" />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">{anime.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl text-yellow-400 transition-transform duration-300 hover:scale-125">★</span>
              <span className="text-lg text-white">{anime.score || "N/A"}</span>
              <span className="text-gray-400 text-sm">({anime.scored_by} users)</span>
            </div>
            <p className="text-gray-300 mt-3 leading-relaxed text-sm sm:text-base">{anime.synopsis}</p>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-sm text-gray-300 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">ℹ️ Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6">
            <p><strong>Type:</strong> {anime.type || "N/A"}</p>
            <p><strong>Episodes:</strong> {anime.episodes ?? "?"}</p>
            <p><strong>Status:</strong> {anime.status || "?"}</p>
            <p><strong>Aired:</strong> {anime.aired?.string || "?"}</p>
            <p><strong>Premiered:</strong> {anime.season ? `${anime.season[0].toUpperCase()}${anime.season.slice(1)} ${anime.year}` : "?"}</p>
            <p><strong>Broadcast:</strong> {anime.broadcast?.string || "?"}</p>
            <p><strong>Producers:</strong> {anime.producers?.map((p: any) => p.name).join(", ") || "?"}</p>
            <p><strong>Licensors:</strong> {anime.licensors?.map((l: any) => l.name).join(", ") || "None found"}</p>
            <p><strong>Studios:</strong> {anime.studios?.map((s: any) => s.name).join(", ") || "?"}</p>
            <p><strong>Source:</strong> {anime.source || "?"}</p>
            <p><strong>Duration:</strong> {anime.duration || "?"}</p>
            <p><strong>Rating:</strong> {anime.rating || "?"}</p>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {anime.genres?.map((g: any) => (
              <span key={g.mal_id} className="bg-red-600/70 text-white px-2 py-1 rounded text-xs">{g.name}</span>
            ))}
            {anime.themes?.map((t: any) => (
              <span key={t.mal_id} className="bg-purple-600/70 text-white px-2 py-1 rounded text-xs">{t.name}</span>
            ))}
            {anime.demographics?.map((d: any) => (
              <span key={d.mal_id} className="bg-blue-600/70 text-white px-2 py-1 rounded text-xs">{d.name}</span>
            ))}
          </div>
        </div>

        {/* Trailer */}
        {anime.trailer?.youtube_id && (
          <div className="w-full flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 w-full">🎬 Watch Trailer</h2>
            <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-300">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Related Anime Carousel */}
        {relatedAnime.length > 0 && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2 text-center">🧩 Related Anime</h2>
            <div ref={sliderRef} className="keen-slider">
              {relatedAnime.map((anime) => (
                <div key={anime.entry.mal_id} className="keen-slider__slide flex justify-center">
                  <Link href={`/anime/${anime.entry.mal_id}`}>
                    <div className="w-[160px] h-[250px] bg-gray-900/60 rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/40 transition-transform duration-300 hover:scale-105 group border border-gray-700 flex flex-col">
                      <div className="relative w-full h-[210px]">
                        <Image
                          src={anime.entry.images.webp.image_url}
                          alt={anime.entry.title || "Related Anime Cover"}
                          fill
                          className="object-cover group-hover:brightness-110 transition duration-300"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      </div>
                      <div className="p-2 text-xs sm:text-sm text-center w-full line-clamp-2 text-white bg-black/60 backdrop-blur-sm">
                        {anime.entry.title}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
