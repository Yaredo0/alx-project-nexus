"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function PlaylistPage() {
  const [playlist, setPlaylist] = useState<any[]>([]);

  useEffect(() => {
    // For now, simulate playlist items from localStorage
    const saved = localStorage.getItem("playlist");
    if (saved) {
      setPlaylist(JSON.parse(saved));
    }
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Playlist</h1>
      <p>Your saved movies and TV shows, organized into playlists.</p>

      {playlist.length === 0 ? (
        <p>No items in your playlist yet. Add some favorites to see them here!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {playlist.map((item) => (
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