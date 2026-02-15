"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function DownloadedPage() {
  const [downloaded, setDownloaded] = useState<any[]>([]);

  useEffect(() => {
    // For now, simulate downloaded items from localStorage
    const saved = localStorage.getItem("downloaded");
    if (saved) {
      setDownloaded(JSON.parse(saved));
    }
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Downloaded</h1>
      <p>Movies and TV shows you’ve saved for offline viewing.</p>

      {downloaded.length === 0 ? (
        <p>No downloaded items yet. Save something to see it here!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {downloaded.map((item) => (
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