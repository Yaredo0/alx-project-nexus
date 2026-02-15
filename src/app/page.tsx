import tmdb from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import FeaturedShow from "@/components/FeaturedShow";
import ContinueWatching from "@/components/ContinueWatching";
import Section from "@/components/Section";
import MovieCard from "@/components/MovieCard";
import GenreFilter from "@/components/GenreFilter";

export default async function HomePage() {
  // Fetch trending movies
  const trendingRes = await tmdb.get("/trending/movie/week");
  const trendingMovies = trendingRes.data.results;

  // Fetch top rated movies
  const topRatedRes = await tmdb.get("/movie/top_rated");
  const topRatedMovies = topRatedRes.data.results;

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