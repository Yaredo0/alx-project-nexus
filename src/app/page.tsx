"use client"; // ✅ make this a client component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import tmdb from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import FeaturedShow from "@/components/FeaturedShow";
import ContinueWatching from "@/components/ContinueWatching";
import Section from "@/components/Section";
import MovieCard from "@/components/MovieCard";
import GenreFilter from "@/components/GenreFilter";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const router = useRouter();

  // ✅ simulate a "click" on load
  useEffect(() => {
    router.replace("/"); // feels like Home was clicked
  }, [router]);

  // ✅ fetch data client-side
  useEffect(() => {
    async function fetchData() {
      const trendingRes = await tmdb.get("/trending/movie/week");
      setTrendingMovies(trendingRes.data.results);

      const topRatedRes = await tmdb.get("/movie/top_rated");
      setTopRatedMovies(topRatedRes.data.results);
    }
    fetchData();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <SearchBar />
      <FeaturedShow />
      <ContinueWatching />

      <Section title="Popular on TinyMoviez">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {trendingMovies.slice(0, 10).map((movie: any) => (
            <MovieCard key={movie.id} item={movie} isTvShow={false} />
          ))}
        </div>
      </Section>

      <Section title="Top Rated">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {topRatedMovies.slice(0, 10).map((movie: any) => (
            <MovieCard key={movie.id} item={movie} isTvShow={false} />
          ))}
        </div>
      </Section>

      <Section title="Genres">
        <GenreFilter />
      </Section>
    </main>
  );
}