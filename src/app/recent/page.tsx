"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function RecentPage() {
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRecent() {
      const res = await fetch("/api/recent");
      const data = await res.json();
      setRecent(data);
    }
    fetchRecent();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Recent</h1>
      {recent.length === 0 ? (
        <p>No recent movies or shows. Start watching to see them here!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {recent.map((item) => (
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