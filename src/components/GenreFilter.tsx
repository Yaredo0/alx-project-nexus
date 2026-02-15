"use client";

import { useEffect, useState } from "react";
import tmdb from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default function GenreFilter() {
  const [genres, setGenres] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await tmdb.get("/genre/movie/list");
      setGenres(res.data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (selected) {
      const fetchMovies = async () => {
        const res = await tmdb.get("/discover/movie", {
          params: { with_genres: selected },
        });
        setMovies(res.data.results);
      };
      fetchMovies();
    }
  }, [selected]);

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {genres.map((genre) => (
          <span
            key={genre.id}
            onClick={() => setSelected(genre.id)}
            style={{
              background: selected === genre.id ? "#1db954" : "#1e1e1e",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            {genre.name}
          </span>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {movies.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} item={movie} isTvShow={false} />

          ))}
        </div>
      )}
    </div>
  );
}