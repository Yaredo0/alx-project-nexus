import tmdb from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import ContinueWatching from "@/components/ContinueWatching";
import Section from "@/components/Section";
import MovieCard from "@/components/MovieCard";
import GenreFilter from "@/components/GenreFilter";

export default async function AnimePage() {
  // Fetch popular TV shows
  const popularRes = await tmdb.get("/tv/popular");
  const popularTvShows = popularRes.data.results;

  // Fetch top rated TV shows
  const topRatedRes = await tmdb.get("/tv/top_rated");
  const topRatedTvShows = topRatedRes.data.results;

  // Fetch trending TV shows
  const trendingRes = await tmdb.get("/trending/tv/week");
  const trendingTvShows = trendingRes.data.results;

  // ✅ Filter anime strictly by Animation genre (16)
  const isAnime = (show: any) => show.genre_ids?.includes(16);

  const trendingAnime = trendingTvShows.filter(isAnime);
  const popularAnime = popularTvShows.filter(isAnime);
  const topRatedAnime = topRatedTvShows.filter(isAnime);

  return (
    <main style={{ padding: "2rem" }}>
      <SearchBar />
      <ContinueWatching />

      <Section title="Trending Anime">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {trendingAnime.slice(0, 10).map((show: any) => (
            <MovieCard key={show.id} item={show} isTvShow={true} />
          ))}
        </div>
      </Section>

      <Section title="Popular Anime">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {popularAnime.slice(0, 10).map((show: any) => (
            <MovieCard key={show.id} item={show} isTvShow={true} />
          ))}
        </div>
      </Section>

      <Section title="Top Rated Anime">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {topRatedAnime.slice(0, 10).map((show: any) => (
            <MovieCard key={show.id} item={show} isTvShow={true} />
          ))}
        </div>
      </Section>

      <Section title="Genres">
        <GenreFilter /> {/* optional: could be filtered to only show Animation */}
      </Section>
    </main>
  );
}