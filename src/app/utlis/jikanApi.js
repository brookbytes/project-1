const BASE_URL = "https://api.jikan.moe/v4";

export const fetchAnime = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/top/anime?filter=${category}`);
    const data = await response.json();
    return data.data; // Jikan API returns results inside "data"
  } catch (error) {
    console.error("Error fetching anime:", error);
    return [];
  }
};
