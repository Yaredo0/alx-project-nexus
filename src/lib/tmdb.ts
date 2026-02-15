import axios, { AxiosResponse, AxiosError } from "axios";

const tmdb = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
  },
});

tmdb.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error("TMDB API Error:", {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        params: error.config?.params,
        data: error.response.data, // ✅ log actual error body
      });
    } else {
      console.error("TMDB API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default tmdb;