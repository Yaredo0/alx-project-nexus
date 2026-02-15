"use client";

import Link from "next/link";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #222;
  color: #fff;
`;

export default function Navbar() {
  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/discover">Discover</Link>
      <Link href="/library">Library</Link>
      <Link href="/discover">Discover</Link>
      <Link href="/library">Library</Link>
      <Link href="/awards">Awards</Link>
      <Link href="/celebrities">Celebrities</Link>
      <Link href="/recent">Recent</Link>
    </Nav>
  );
}