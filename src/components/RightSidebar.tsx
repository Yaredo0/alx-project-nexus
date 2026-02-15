"use client";

import styled from "styled-components";
import Image from "next/image";
import { FiBell, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SmallMovieCard from "@/components/SmallMovieCard";
import tmdb from "@/lib/tmdb";
import { useEffect, useState } from "react";

const RightSidebarWrapper = styled.aside`
  width: 280px;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing(2)};
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  min-width: 0; /* ✅ prevents overflow */
`;

const UserName = styled.span`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  width: 32px;
  height: 32px;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const NavText = styled.span<{ $primary?: boolean }>`
  font-weight: ${({ $primary }) => ($primary ? "600" : "400")};
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.text : theme.colors.muted};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export default function RightSidebar() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await tmdb.get("/trending/movie/week");
      setMovies(res.data.results.slice(0, 3));
    };
    fetchMovies();
  }, []);

  return (
    <RightSidebarWrapper>
      {/* Header */}
      <Header>
        <NotificationButton>
          <FiBell />
        </NotificationButton>
        <UserInfo>
          <UserName>Samantha</UserName>
          <Avatar>
            {/* ✅ Ensure profile.png exists in /public */}
            <Image
              src="/profile.png"
              alt="Samantha"
              width={32}
              height={32}
            />
          </Avatar>
        </UserInfo>
      </Header>

      {/* Navigation Row */}
      <NavRow>
        <NavText $primary>Continue</NavText>
        <FiChevronLeft />
        <NavText>See More</NavText>
        <FiChevronRight />
      </NavRow>

      {/* Continue Watching Section */}
      {movies.map((movie) => (
        <SmallMovieCard key={movie.id} item={movie} />
      ))}
    </RightSidebarWrapper>
  );
}