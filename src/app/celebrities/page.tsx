import tmdb from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import ContinueWatching from "@/components/ContinueWatching";
import Section from "@/components/Section";
import Image from "next/image";
import Link from "next/link";

// Simple card for celebrities
function CelebrityCard({ person }: { person: any }) {
  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : "/file.svg";

  return (
    <Link href={`/celebrity/${person.id}`}>
      <div
        style={{
          width: "200px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <Image
          src={profileUrl}
          alt={person.name}
          width={200}
          height={300}
          style={{ borderRadius: "8px", objectFit: "cover" }}
        />
        <h3 style={{ marginTop: "0.5rem" }}>{person.name}</h3>
      </div>
    </Link>
  );
}

export default async function CelebritiesPage() {
  // Fetch trending celebrities
  const trendingRes = await tmdb.get("/trending/person/week");
  const trendingCelebs = trendingRes.data.results;

  // Placeholder: Award winners (TMDB doesn’t have direct award filters, so you’d curate or use keywords)
  const awardRes = await tmdb.get("/person/popular");
  const awardCelebs = awardRes.data.results;

  // Placeholder: Fan favorites (could be based on popularity or watchlist metrics)
  const fanRes = await tmdb.get("/person/popular");
  const fanCelebs = fanRes.data.results;

  return (
    <main style={{ padding: "2rem" }}>
      <SearchBar />
      <ContinueWatching />

      <h1>Celebrities</h1>
      <p>Discover profiles of actors, directors, and creators featured on TinyMoviez.</p>

      <Section title="Trending Celebrities">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {trendingCelebs.slice(0, 10).map((person: any) => (
            <CelebrityCard key={person.id} person={person} />
          ))}
        </div>
      </Section>

      <Section title="Award Winners">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {awardCelebs.slice(0, 10).map((person: any) => (
            <CelebrityCard key={person.id} person={person} />
          ))}
        </div>
      </Section>

      <Section title="Fan Favorites">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {fanCelebs.slice(0, 10).map((person: any) => (
            <CelebrityCard key={person.id} person={person} />
          ))}
        </div>
      </Section>
    </main>
  );
}