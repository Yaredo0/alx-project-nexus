"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import {
  CiHome,
  CiCompass1,
  CiTrophy,
  CiClock1,
  CiStar,
  CiHeart,
  CiCirclePlus,
  CiCircleCheck,
  CiSettings,
  CiLogout,
  CiSaveDown2, // ✅ outlined download icon
} from "react-icons/ci";
import { VscVerified } from "react-icons/vsc";

const SidebarWrapper = styled.aside`
  width: 220px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(2)};
  height: 100vh;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: <div className="5"></div>rem;
`;

const LogoText = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const SectionTitle = styled.h4`
  margin: 1rem 0 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  margin: 0.5rem 0;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 1.1rem;   /* consistent size */
    stroke-width: 1.2;   /* consistent outline thickness */
  }
`;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarWrapper>
      {/* Logo at the top */}
      
            <LogoWrapper>
        <Link href="/">
          {/* Option 2: Image logo */}
        <Image src="/logo.png" alt="Logo" width={120} height={80} />
        </Link>
      </LogoWrapper>

      {/* Main Navigation */}
      <SectionTitle>Main</SectionTitle>
      <NavLink href="/" $active={pathname === "/"}>
        <CiHome /> Home
      </NavLink>
      <NavLink href="/discover" $active={pathname.startsWith("/discover")}>
        <CiCompass1 /> Discover
      </NavLink>
      <NavLink href="/awards" $active={pathname.startsWith("/awards")}>
        <CiTrophy /> Awards
      </NavLink>
      <NavLink href="/celebrities" $active={pathname.startsWith("/celebrities")}>
        <VscVerified /> Celebrities
      </NavLink>

      {/* Library */}
      <SectionTitle>Library</SectionTitle>
      <NavLink href="/recent" $active={pathname.startsWith("/recent")}>
        <CiClock1 /> Recent
      </NavLink>
      <NavLink href="/top-rated" $active={pathname.startsWith("/top-rated")}>
        <CiStar /> Top Rated
      </NavLink>
      <NavLink href="/downloaded" $active={pathname.startsWith("/downloaded")}>
        <CiSaveDown2 /> Downloaded {/* ✅ outlined icon */}
      </NavLink>
      <NavLink href="/playlists" $active={pathname.startsWith("/playlists")}>
        <CiHeart /> Playlists
      </NavLink>
      <NavLink href="/watchlist" $active={pathname.startsWith("/watchlist")}>
        <CiCirclePlus /> Watchlist
      </NavLink>
      <NavLink href="/completed" $active={pathname.startsWith("/completed")}>
        <CiCircleCheck /> Completed
      </NavLink>

      {/* General */}
      <SectionTitle>General</SectionTitle>
      <NavLink href="/settings" $active={pathname.startsWith("/settings")}>
        <CiSettings /> Settings
      </NavLink>
      <NavLink href="/logout" $active={pathname.startsWith("/logout")}>
        <CiLogout /> Log Out
      </NavLink>
    </SidebarWrapper>
  );
}