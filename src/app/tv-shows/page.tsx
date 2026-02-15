import tmdb from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import ContinueWatching from "@/components/ContinueWatching";
import Section from "@/components/Section";
import MovieCard from "@/components/MovieCard";
import GenreFilter from "@/components/GenreFilter";

export default async function TvPage() {
  // Fetch popular TV shows
  const popularRes = await tmdb.get("/tv/popular");
  const popularTvShows = popularRes.data.results;

  // Fetch top rated TV shows
  const topRatedRes = await tmdb.get("/tv/top_rated");
  const topRatedTvShows = topRatedRes.data.results;

  // Fetch trending TV shows
  const trendingRes = await tmdb.get("/trending/tv/week");
  const trendingTvShows = trendingRes.data.results;

  return (
    <main style={{ padding: "2rem" }}>
      <SearchBar />
      <ContinueWatching />

      <Section title="Trending TV Shows">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {trendingTvShows.slice(0, 10).map((show: any) => (
            <MovieCard key={show.id} item={show} isTvShow={true} />
          ))}
        </div>
      </Section>

      <Section title="Popular TV Shows">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {popularTvShows.slice(0, 10).map((show: any) => (
            <MovieCard key={show.id} item={show} isTvShow={true} />
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

      <Section title="Genres">
        <GenreFilter /> {/* keep generic, or extend to accept type="tv" */}
      </Section>
    </main>
  );
}