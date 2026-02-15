"use client";

import styled from "styled-components";

const SectionWrapper = styled.section`
  margin: 2rem 0;
`;

const Header = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionWrapper>
      <Header>{title}</Header>
      {children}
    </SectionWrapper>
  );
}