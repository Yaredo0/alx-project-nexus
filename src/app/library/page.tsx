"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function LibraryPage() {
  const [library, setLibrary] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("library");
    if (saved) {
      setLibrary(JSON.parse(saved));
    }
  }, []);

  if (library.length === 0) {
    return <p style={{ padding: "2rem" }}>Your library is empty.</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>My Library</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {library.map((movie) => (
          <MovieCard key={movie.id} item={movie} isTvShow={false} />
        ))}
      </div>
    </main>
  );
}