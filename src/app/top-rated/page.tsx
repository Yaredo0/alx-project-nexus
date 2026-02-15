import tmdb from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import ContinueWatching from "@/components/ContinueWatching";
import Section from "@/components/Section";
import MovieCard from "@/components/MovieCard";

export default async function TopRatedPage() {
  // Fetch top rated movies
  const topRatedMoviesRes = await tmdb.get("/movie/top_rated");
  const topRatedMovies = topRatedMoviesRes.data.results;

  // Fetch top rated TV shows
  const topRatedTvRes = await tmdb.get("/tv/top_rated");
  const topRatedTvShows = topRatedTvRes.data.results;

  return (
    <main style={{ padding: "2rem" }}>
      <SearchBar />
      <ContinueWatching />

      <h1>Top Rated</h1>
      <p>Explore the highest-rated movies and TV shows on TinyMoviez.</p>

      <Section title="Top Rated Movies">
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

      <Section title="Top Rated TV Shows">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {topRatedTvShows.slice(0, 10).map((show: any) => (
            <MovieCard key={show.id} item={show} isTvShow={true} />
          ))}
        </div>
      </Section>
    </main>
  );
}