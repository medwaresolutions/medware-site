"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeCtx = {
  theme: Theme;
  dark: boolean;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

function readAttr(): Theme {
  if (typeof document !== "undefined") {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "dark" || t === "light") return t;
  }
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy-init from the attribute the inline head script set before paint, so
  // the very first client render already matches the active theme.
  const [theme, setThemeState] = useState<Theme>(readAttr);

  // Belt-and-braces: re-sync once after mount in case init ran server-side.
  useEffect(() => {
    setThemeState(readAttr());
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("mw-theme", t);
    } catch {
      /* storage unavailable — ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(readAttr() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, dark: theme === "dark", toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return { theme: "light", dark: false, toggle: () => {}, setTheme: () => {} };
  }
  return ctx;
}
