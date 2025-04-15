"use client"; // This tells Next.js to treat this as a Client Component

import Image from "next/image";
import Link from "next/link";

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
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
    if (!res.ok) return [];
    const data = await res.json();
    
    // Check if data exists and contains recommendations
    return data.data ? data.data.slice(0, 6) : [];  // Safely return an empty array if no data
  } catch (error) {
    console.error("Error fetching related anime:", error);
    return []; // Return an empty array if there's an error in fetching data
  }
}

export default async function AnimeDetails({ params }: AnimeDetailsProps) {
  const anime = await getAnimeDetails(params.id);
  const relatedAnime = await getRelatedAnime(params.id);

  if (!anime) return <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", padding: "2rem" }}>Anime not found</div>;

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Main content centered and pushed down */}
      <div style={{ marginTop: "3cm" }} className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
        <Image
          src={anime.images.jpg.image_url}
          alt={anime.title}
          width={250}
          height={360}
          className="rounded mb-6"
        />

        {/* Action Buttons Box with inline CSS */}
        <div
          style={{
            border: "2px solid red",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <WatchAddButton text="Watch" />
          <WatchAddButton text="Add to List" />
        </div>

        {/* Synopsis */}
        <p className="max-w-2xl mb-10 text-gray-300">{anime.synopsis}</p>

        {/* Trailer */}
        {anime.trailer.youtube_id && (
          <div className="w-full max-w-4xl mb-16">
            <h2 className="text-2xl font-bold mb-4">Watch Trailer</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64 sm:h-80 md:h-96 rounded-lg"
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Back Button */}
        <Link
          href="/"
          style={{
            color: "white",
            backgroundColor: "#dc2626", // Tailwind red-600
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "1.5rem",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#b91c1c"; // Tailwind red-700 on hover
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#dc2626";
          }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Related Anime Section */}
      {relatedAnime && relatedAnime.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-4 text-center">Related Anime</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedAnime.map((anime) => (
              <Link href={`/anime/${anime.entry.mal_id}`} key={anime.entry.mal_id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition">
                  <Image
                    src={anime.entry.images.webp.image_url}
                    alt={anime.entry.title}
                    width={150}
                    height={220}
                    className="w-full h-auto"
                  />
                  <div className="p-2 text-center text-white text-sm">{anime.entry.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Client component for buttons with event handlers
const WatchAddButton = ({ text }: { text: string }) => (
  <button
    style={{
      padding: "0.5rem 1.5rem",
      border: "2px solid red",
      color: "red",
      backgroundColor: "transparent",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      cursor: "pointer", // Add cursor pointer to indicate it's clickable
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "red";
      e.currentTarget.style.color = "white";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = "red";
    }}
  >
    {text}
  </button>
);
