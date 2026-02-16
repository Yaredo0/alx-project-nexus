"use client";

import { useEffect, useState } from "react";
import tmdb from "@/lib/tmdb";
import Image from "next/image";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Wrapper = styled.section`
  position: relative;
  margin: 0 auto 2rem auto;
  overflow: hidden;
  width: 100%;
  height: 600px;
  border-radius: 8px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Slide = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  z-index: ${({ $active }) => ($active ? 1 : 0)};
`;

const Title = styled.h2`
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  font-size: 1.5rem;
  color: #fff;
  z-index: 5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const WatchlistButton = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  z-index: 5;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
`;

const WatchNowButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  color: #000;
  font-weight: bold;
  z-index: 5;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
`;

const ArrowButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === "left" ? "left: 1rem;" : "right: 1rem;")}
  background: rgba(0,0,0,0.5);
  border: none;
  color: #fff;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;

  &:hover {
    background: rgba(0,0,0,0.8);
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.secondary};
  }

  span.active {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export default function FeaturedShow() {
  const [movies, setMovies] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await tmdb.get("/movie/popular");
        setMovies(res.data.results.slice(0, 10));
      } catch (err) {
        console.error("TMDB fetch failed:", err);
        setMovies([]); // ✅ prevents fallback overlay
      }
    }
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) {
    return <p style={{ color: "white" }}>No featured movies available.</p>;
  }

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % movies.length);

  return (
    <Wrapper>
      {movies.map((movie: any, i: number) => {
        const imageUrl = movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : null; // ✅ no hardcoded fallback

        return (
          <Slide key={movie.id} $active={i === index}>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={movie.title}
                fill
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            )}
            <Title>{movie.title}</Title>
            <WatchlistButton>+ Watchlist</WatchlistButton>
            <WatchNowButton>Watch Now</WatchNowButton>
          </Slide>
        );
      })}

      <ArrowButton $side="left" onClick={prevSlide}>
        <FiChevronLeft size={24} />
      </ArrowButton>
      <ArrowButton $side="right" onClick={nextSlide}>
        <FiChevronRight size={24} />
      </ArrowButton>

      <Dots>
        {movies.map((_, i) => (
          <span key={i} className={i === index ? "active" : ""}></span>
        ))}
      </Dots>
    </Wrapper>
  );
}