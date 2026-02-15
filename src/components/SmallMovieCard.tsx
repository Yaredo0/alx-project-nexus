"use client";

import styled from "styled-components";
import Image from "next/image";

type SmallMovieCardProps = {
  item: any; // TMDB movie or TV show object
  progress?: number; // optional progress 0–1
};

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Thumbnail = styled.div`
  position: relative;
  width: 60px;
  height: 60px; /* ✅ smaller square */
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.muted};
`;

const Content = styled.div`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  font-size: 1rem; /* slightly larger text for readability */
  margin: 0 0 ${({ theme }) => theme.spacing(0.5)} 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ProgressBar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.colors.muted};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const Progress = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => $progress * 100}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(0.5)};
  border-radius: 4px;
  border: ${({ $primary }) => ($primary ? "none" : "1px solid #ccc")};
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary : theme.colors.surface};
  color: ${({ $primary, theme }) => ($primary ? "#fff" : theme.colors.text)};
  cursor: pointer;
  font-size: 0.8rem;
`;

export default function SmallMovieCard({ item, progress = 0.5 }: SmallMovieCardProps) {
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
    : "/file.svg";

  const title = item.title || item.name;

  return (
    <Card>
      <Thumbnail>
        <Image
          src={posterUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="60px"
        />
      </Thumbnail>
      <Content>
        <Title>{title}</Title>
        <ProgressBar>
          <Progress $progress={progress} />
        </ProgressBar>
        <Actions>
          <Button>Drop</Button>
          <Button $primary>Watch</Button>
        </Actions>
      </Content>
    </Card>
  );
}