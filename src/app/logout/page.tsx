"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear local storage (watchlist, recent, playlist, etc.)
    localStorage.removeItem("watchlist");
    localStorage.removeItem("recent");
    localStorage.removeItem("playlist");
    localStorage.removeItem("downloaded");
    localStorage.removeItem("completed");

    // If you have auth tokens, clear them here too
    localStorage.removeItem("authToken");

    // Redirect to home or login page after logout
    router.push("/");
  }, [router]);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Logging out...</h1>
      <p>You are being signed out. Redirecting to home.</p>
    </main>
  );
}