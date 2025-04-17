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

  let relatedAnime: any[] = [];
  try {
    relatedAnime = await getRelatedAnime(params.id);
  } catch (error) {
    console.error("Failed to fetch related anime", error);
    relatedAnime = [];
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <p className="text-xl font-semibold animate-pulse">Loading anime details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 sm:px-6 md:px-10 pt-20 pb-12">
      {/* Anime Info */}
      <div className="flex flex-col md:flex-row items-start gap-8">
        <Image
          src={anime.images.jpg.image_url}
          alt={anime.title || "Anime Cover"}
          width={200}
          height={280}
          className="rounded-lg object-cover shadow-lg border border-gray-700"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{anime.title}</h1>
          {/* Score */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-lg">{anime.score || "N/A"}</span>
            <span className="text-gray-400 text-sm">({anime.scored_by} users)</span>
          </div>

          {/* Synopsis */}
          <p className="text-gray-300 mt-4">{anime.synopsis}</p>
        </div>
      </div>
      {/* Information Section */}
<div className="mt-10 bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-sm text-gray-300 space-y-2">
  <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">ℹ️ Information</h2>
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
  <p><strong>Genres:</strong> {anime.genres?.map((g: any) => g.name).join(", ") || "?"}</p>
  <p><strong>Theme:</strong> {anime.themes?.map((t: any) => t.name).join(", ") || "?"}</p>
  <p><strong>Demographic:</strong> {anime.demographics?.map((d: any) => d.name).join(", ") || "?"}</p>
  <p><strong>Duration:</strong> {anime.duration || "?"}</p>
  <p><strong>Rating:</strong> {anime.rating || "?"}</p>
</div>
      {/* Trailer */}
      {anime.trailer?.youtube_id && (
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 text-center">🎬 Watch Trailer</h2>
          <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-700 aspect-video">
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

      {/* Related Anime */}
      {relatedAnime.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">🧩 Related Anime</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {relatedAnime.map((anime) => (
              <Link href={`/anime/${anime.entry.mal_id}`} key={anime.entry.mal_id}>
                <div className="bg-gray-800 bg-opacity-40 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105">
                  <Image
                    src={anime.entry.images.webp.image_url}
                    alt={anime.entry.title || "Related Anime Cover"}
                    width={160}
                    height={220}
                    className="w-full object-cover"
                  />
                  <div className="p-2 text-sm text-center">{anime.entry.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
