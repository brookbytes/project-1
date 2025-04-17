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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-10 px-6 sm:px-10 flex justify-center">
      <div className="w-full max-w-[210mm] bg-[#111] border border-gray-700 rounded-xl p-8 shadow-lg space-y-16">

        {/* Anime Info */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative w-[200px] h-[280px]">
            <Image
              src={anime.images.jpg.image_url}
              alt={anime.title || "Anime Cover"}
              fill
              className="rounded-lg object-cover shadow-xl"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg" />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-md">{anime.title}</h1>
            <div className="flex items-center gap-3 text-yellow-400 mt-2">
              <span className="text-2xl">★</span>
              <span className="text-lg text-white">{anime.score || "N/A"}</span>
              <span className="text-gray-400 text-sm">({anime.scored_by} users)</span>
            </div>
            <p className="text-gray-300 mt-3 leading-relaxed">{anime.synopsis}</p>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-sm text-gray-300 space-y-4">
          <h2 className="text-xl font-bold text-white mb-2 border-b border-gray-700 pb-2">ℹ️ Information</h2>
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
          <div className="mt-4 flex flex-wrap gap-2">
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
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">🎬 Watch Trailer</h2>
            <div className="mx-auto w-full max-w-3xl rounded-lg overflow-hidden shadow-lg border border-gray-700 aspect-video">
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
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">🧩 Related Anime</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
              {relatedAnime.map((anime) => (
                <Link href={`/anime/${anime.entry.mal_id}`} key={anime.entry.mal_id}>
                  <div className="w-[160px] h-[260px] flex flex-col items-center bg-gray-900/50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105">
                    <div className="relative w-full h-[220px]">
                      <Image
                        src={anime.entry.images.webp.image_url}
                        alt={anime.entry.title || "Related Anime Cover"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 text-sm text-center w-full truncate">{anime.entry.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
