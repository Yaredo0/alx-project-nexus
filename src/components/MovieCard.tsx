"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { CiCirclePlus } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

interface MovieCardProps {
  item: any;       // TMDB movie or TV show object
  isTvShow?: boolean;
}

// ✅ Map TMDB genre IDs to names
const genreMap: Record<number, string> = {
  // Movie genres
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",

  // TV genres
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

export default function MovieCard({ item, isTvShow }: MovieCardProps) {
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "/file.svg";

  const title = isTvShow ? item.name : item.title;
  const rating = item.vote_average || 0;

  // ✅ Pick first genre ID and map to name
  const genreName = item.genre_ids?.length
    ? genreMap[item.genre_ids[0]] || "Unknown"
    : "Unknown";

  // ✅ Runtime or Episodes
  let lengthOrEpisodes: string | null = null;
  if (isTvShow) {
    lengthOrEpisodes = item.number_of_episodes
      ? `${item.number_of_episodes} Ep`
      : null; // only show if available
  }

  return (
    <Link href={isTvShow ? `/tv/${item.id}` : `/movie/${item.id}`}>
      <Card>
        {/* Poster image as background */}
        <ImageWrapper>
          <Image src={posterUrl} alt={title} fill style={{ objectFit: "cover" }} />
        </ImageWrapper>

        {/* Overlay content */}
        <Overlay>
          {/* Title + Rating (top left) */}
          <div>
            <Title>{title}</Title>
            <Rating>
              {[...Array(5)].map((_, i) => {
                const starValue = (rating / 10) * 5; // convert 0–10 to 0–5 scale
                return (
                  <FaStar
                    key={i}
                    color={i < Math.round(starValue) ? undefined : "gray"}
                  />
                );
              })}
            </Rating>
          </div>

          {/* Bottom section */}
          <BottomSection>
            {/* Episodes (only for TV shows) + Genre directly above buttons */}
            <InfoRow>
              {lengthOrEpisodes && <span>{lengthOrEpisodes}</span>}
              <span>{genreName}</span>
            </InfoRow>

            {/* Bottom row: + icon left, Watch button right */}
            <BottomRow>
              <AddButton>
                <CiCirclePlus />
              </AddButton>
              <WatchButton>Watch</WatchButton>
            </BottomRow>
          </BottomSection>
        </Overlay>
      </Card>
    </Link>
  );
}

/* ---------------- STYLES ---------------- */

const Card = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 20%,
    rgba(0, 0, 0, 0.7) 100%
  );
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h2`
  font-size: 1rem;
  margin: 0;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  font-size: 0.9rem;

  svg {
    color: ${({ theme }) => theme.colors.primary}; /* ✅ theme primary for filled stars */
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary}; /* ✅ theme primary on hover */
  }
`;

const WatchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary}; /* ✅ theme primary */
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.background}; /* ✅ contrast text */

  &:hover {
    opacity: 0.85; /* subtle hover effect */
  }
`;