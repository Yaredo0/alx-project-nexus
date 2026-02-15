"use client";

import "./globals.css";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        <ThemeProvider theme={theme}>
          <div
            style={{
              display: "flex",
              minHeight: "100vh",
              flexWrap: "wrap", // ✅ allows sidebars to stack on small screens
            }}
          >
            {/* Left sidebar */}
            <aside
              style={{
                width: "250px",
                backgroundColor: theme.colors.surface,
                flexShrink: 0,
              }}
            >
              <Sidebar />
            </aside>

            {/* Middle content area */}
            <main
              style={{
                flex: 1,
                padding: "2rem",
                backgroundColor: theme.colors.background,
                minWidth: 0, // ✅ prevents flex overflow
              }}
            >
              {children}
            </main>

            {/* Right sidebar */}
            <aside
              style={{
                width: "250px",
                backgroundColor: theme.colors.surface,
                flexShrink: 0,
              }}
            >
              <RightSidebar />
            </aside>
          </div>

          <ToastContainer position="bottom-right" autoClose={3000} />
        </ThemeProvider>
      </body>
    </html>
  );
}