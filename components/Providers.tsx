"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeLangContextType = {
  lang: "en" | "th";
  setLang: (l: "en" | "th") => void;
  dark: boolean;
  setDark: (d: boolean) => void;
};

const ThemeLangContext = createContext<ThemeLangContextType | undefined>(
  undefined
);

export function useThemeLang() {
  const ctx = useContext(ThemeLangContext);
  if (!ctx) throw new Error("useThemeLang must be used within Providers");
  return ctx;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"en" | "th">("en");
  const [dark, setDark] = useState<boolean>(true);

  useEffect(() => {
    const storedLang = localStorage.getItem("nsai_lang");
    const storedTheme = localStorage.getItem("nsai_dark");
    if (storedLang === "th") setLang("th");
    if (storedTheme === "0") setDark(false);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("nsai_lang", lang);
      localStorage.setItem("nsai_dark", dark ? "1" : "0");
    } catch (e) {}
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [lang, dark]);

  return (
    <ThemeLangContext.Provider value={{ lang, setLang, dark, setDark }}>
      {children}
    </ThemeLangContext.Provider>
  );
}
