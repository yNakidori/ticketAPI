import axios from "axios";

export const fetchVideo = async () => {
  try {
    const response = await axios.get(
      "https://api.pexels.com/videos/search?query=logistichub&per_page=50",
      {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      }
    );
    const videos = response.data.videos;
    if (videos.length > 0) {
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      return randomVideo.video_files[0].link;
    }
    console.log("Nenhum vídeo encontrado.");
    return null;
  } catch (error) {
    console.error("Erro ao buscar vídeo do Pexels:", error);
    return null;
  }
};
