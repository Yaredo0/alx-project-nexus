export const theme = {
  colors: {
    background: "#111B3A",
    surface: "#1B0833",   // neutral surface layer for inputs/cards
    text: "#ffffff",
    primary: "#FFFF5E",   // yellow highlight
    secondary: "#999999", // muted gray for section titles
    muted: "#f9f9f9b9",     // optional extra muted tone
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
};