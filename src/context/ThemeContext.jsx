import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const themes = {
  green: {
    name: "Default",
    primary: "24 24 27", // gray-900
    primaryHover: "0 0 0", // black
    primaryLight: "255 237 213", // orange-100
    sidebar: "from-gray-900 to-black",
    sidebarText: "text-gray-100",
    sidebarActive: "bg-white text-orange-600",
    accent: "bg-gray-900",
    accentHover: "hover:bg-black",
    button: "bg-gray-900 hover:bg-black",
    badge: "bg-orange-100 text-orange-600",
    icon: "text-orange-500",
  },
  white: {
    name: "Light",
    primary: "107 114 128", // gray-500
    primaryHover: "75 85 99", // gray-600
    primaryLight: "243 244 246", // gray-100
    sidebar: "from-gray-100 to-gray-200",
    sidebarText: "text-gray-700",
    sidebarActive: "bg-gray-800 text-white",
    accent: "bg-gray-700",
    accentHover: "hover:bg-gray-800",
    button: "bg-gray-700 hover:bg-gray-800",
    badge: "bg-gray-100 text-gray-700",
    icon: "text-gray-600",
  },
  black: {
    name: "Dark",
    primary: "24 24 27", // zinc-900
    primaryHover: "39 39 42", // zinc-800
    primaryLight: "63 63 70", // zinc-700
    sidebar: "from-zinc-900 to-black",
    sidebarText: "text-zinc-300",
    sidebarActive: "bg-white text-zinc-900",
    accent: "bg-zinc-800",
    accentHover: "hover:bg-zinc-700",
    button: "bg-zinc-800 hover:bg-zinc-700",
    badge: "bg-zinc-800 text-zinc-200",
    icon: "text-zinc-400",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("karlo-theme");
    return savedTheme && themes[savedTheme] ? savedTheme : "green";
  });

  useEffect(() => {
    localStorage.setItem("karlo-theme", theme);

    // Update CSS custom properties
    const root = document.documentElement;
    const currentTheme = themes[theme];

    root.style.setProperty("--color-primary", currentTheme.primary);
    root.style.setProperty("--color-primary-hover", currentTheme.primaryHover);
    root.style.setProperty("--color-primary-light", currentTheme.primaryLight);

    // Add theme class to body
    document.body.classList.remove("theme-green", "theme-white", "theme-black");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
