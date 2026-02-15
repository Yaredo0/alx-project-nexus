"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function ContinueWatching() {
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("continueWatching");
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  if (progress.length === 0) return null;

  return (
    <section style={{ margin: "2rem 0" }}>
      <h2 style={{ color: "#1db954", marginBottom: "1rem" }}>Continue Watching</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {progress.map((movie) => (
          <MovieCard key={movie.id} item={movie} isTvShow={false} />
        ))}
      </div>
    </section>
  );
}