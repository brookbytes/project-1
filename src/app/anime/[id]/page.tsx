// app/anime/[id]/page.tsx

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
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.data.slice(0, 6);
}

export default async function AnimeDetails({ params }: AnimeDetailsProps) {
  const anime = await getAnimeDetails(params.id);
  const relatedAnime = await getRelatedAnime(params.id);

  if (!anime) return <div className="text-white">Anime not found</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>

      <Image
        src={anime.images.jpg.image_url}
        alt={anime.title}
        width={250}
        height={360}
        className="rounded mb-4"
      />

      <p className="mb-6">{anime.synopsis}</p>

      {/* ✅ Trailer Section */}
      {anime.trailer.youtube_id && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Watch Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-96 rounded-lg"
              src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* ✅ Related Anime Section */}
      {relatedAnime.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Anime</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedAnime.map((anime) => (
              <Link href={`/anime/${anime.entry.mal_id}`} key={anime.entry.mal_id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition">
                  <Image
                    src={anime.entry.images.webp.image_url}
                    alt={anime.entry.title}
                    width={200}
                    height={280}
                    className="w-full h-auto"
                  />
                  <div className="p-2 text-center text-white">{anime.entry.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/" className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 mt-10 inline-block">
        ← Back to Home
      </Link>
    </div>
  );
}
