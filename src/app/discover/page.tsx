import tmdb from "@/lib/tmdb";
import Section from "@/components/Section";
import MovieCard from "@/components/MovieCard";

export default async function DiscoverPage() {
  // Fetch different curated categories
  const trendingRes = await tmdb.get("/trending/movie/week");
  const trendingMovies = trendingRes.data.results;

  const upcomingRes = await tmdb.get("/movie/upcoming");
  const upcomingMovies = upcomingRes.data.results;

  const popularTvRes = await tmdb.get("/tv/popular");
  const popularTvShows = popularTvRes.data.results;

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Discover</h1>

      <Section title="Trending Movies">
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {trendingMovies.slice(0, 6).map((movie: any) => (
            <MovieCard key={movie.id} item={movie} isTvShow={false} />

          ))}
        </div>
      </Section>

      <Section title="Upcoming Movies">
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {upcomingMovies.slice(0, 6).map((movie: any) => (
            <MovieCard key={movie.id} item={movie} isTvShow={false} />
          ))}
        </div>
      </Section>

        <Section title="Popular TV Shows">
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {popularTvShows.slice(0, 6).map((show: any) => (
            <MovieCard key={show.id} item={show} isTvShow={true} />
            ))}
        </div>
        </Section>
    </main>
  );
}