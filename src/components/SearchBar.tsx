"use client";

import Link from "next/link";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";       // ✅ left magnifying glass
import { CiFilter } from "react-icons/ci";       // ✅ right filter icon
import { usePathname } from "next/navigation";

const NavBarWrapper = styled.nav`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4)};
  height: 10vh;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  border-bottom: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : "none"};
  padding-bottom: 0.25rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  width: 200px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export default function SearchBar() {
  const pathname = usePathname();

  return (
    <NavBarWrapper>
      {/* Left side links */}
      <NavLinks>
        <NavLink href="/" $active={pathname === "/"}>
          Movies
        </NavLink>
        <NavLink href="/tv-shows" $active={pathname.startsWith("/tv-shows")}>
          TV Shows
        </NavLink>
        <NavLink href="/anime" $active={pathname.startsWith("/anime")}>
          Anime
        </NavLink>
      </NavLinks>

      {/* Right side search */}
      <SearchWrapper>
        <MdSearch />       {/* ✅ magnifying glass on the left */}
        <SearchInput placeholder="Search" />
        <CiFilter />       {/* ✅ filter icon on the right */}
      </SearchWrapper>
    </NavBarWrapper>
  );
}