"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function CompletedPage() {
  const [completed, setCompleted] = useState<any[]>([]);

  useEffect(() => {
    // For now, simulate completed items from localStorage
    const saved = localStorage.getItem("completed");
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Completed</h1>
      <p>Movies and TV shows you’ve finished watching.</p>

      {completed.length === 0 ? (
        <p>No completed items yet. Watch something to see it here!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {completed.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              isTvShow={item.media_type === "tv"}
            />
          ))}
        </div>
      )}
    </main>
  );
}