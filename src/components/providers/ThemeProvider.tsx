"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute={"class"}
      defaultTheme={"light"}
      storageKey={"bidan-lita-theme"}
      value={{
        light: "light",
        dark: "dark",
      }}
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;
