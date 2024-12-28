import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext({
  theme: "light",
  setTheme: () => null,
});

export default function ThemeProvider({
  children,
  defaultTheme = "system", // Default to "light"
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Store theme in localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
