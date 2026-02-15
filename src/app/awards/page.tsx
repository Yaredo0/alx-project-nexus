import tmdb from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import ContinueWatching from "@/components/ContinueWatching";
import Section from "@/components/Section";
import MovieCard from "@/components/MovieCard";

export default async function AwardsPage() {
  // Example: fetch Oscar-winning movies (TMDB has "discover" with keywords or lists)
  // For now, placeholder fetches — you can replace with award-specific queries or curated lists
  const oscarRes = await tmdb.get("/movie/top_rated"); // replace with actual Oscar winners source
  const oscarMovies = oscarRes.data.results;

  const emmyRes = await tmdb.get("/tv/top_rated"); // replace with actual Emmy winners source
  const emmyShows = emmyRes.data.results;

  const festivalRes = await tmdb.get("/movie/popular"); // replace with curated festival favorites
  const festivalMovies = festivalRes.data.results;

  return (
    <main style={{ padding: "2rem" }}>
      <SearchBar />
      <ContinueWatching />

      <h1>Awards</h1>
      <p>Explore movies and TV shows that have won major awards.</p>

      <Section title="Oscar Winners">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {oscarMovies.slice(0, 10).map((movie: any) => (
            <MovieCard key={movie.id} item={movie} isTvShow={false} />
          ))}
        </div>
      </Section>

      <Section title="Emmy Winners">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {emmyShows.slice(0, 10).map((show: any) => (
            <MovieCard key={show.id} item={show} isTvShow={true} />
          ))}
        </div>
      </Section>

      <Section title="Festival Favorites">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {festivalMovies.slice(0, 10).map((movie: any) => (
            <MovieCard key={movie.id} item={movie} isTvShow={false} />
          ))}
        </div>
      </Section>
    </main>
  );
}