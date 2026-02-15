"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    // For now, simulate watchlist items from localStorage
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Watchlist</h1>
      <p>Movies and TV shows you’ve saved to watch later.</p>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. Add some titles to see them here!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {watchlist.map((item) => (
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