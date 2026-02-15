import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;     // added surface
      text: string;
      primary: string;
      secondary: string;
      muted: string;
    };
    spacing: (factor: number) => string;
    fonts: {
      body: string;
      heading: string;
    };
  }
}