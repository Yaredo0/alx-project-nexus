"use client";

import { useEffect, useState } from "react";
import tmdb from "@/lib/tmdb";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  margin-top: 1rem;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

export default function MovieDetail({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await tmdb.get(`/movie/${params.id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("TMDB API Error:", err);
      }
    };
    fetchMovie();
  }, [params.id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <Wrapper>
      <Title>{movie.title}</Title>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
      />
      <Info>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
        <p>{movie.overview}</p>
      </Info>
      <Actions>
        <Button>+ Library</Button>
        <Button>Watch Now</Button>
      </Actions>
    </Wrapper>
  );
}