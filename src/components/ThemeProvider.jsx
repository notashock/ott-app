import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [accentColor, setAccentColor] = useState("#FF4500"); // Default color

  const genreColors = {
    action: "#FF4500",
    horror: "#5A0F0F",
    sciFi: "#00BFFF",
    romance: "#FF69B4",
    comedy: "#FFD700",
    drama: "#8B4513",
  };

  const changeAccentColor = (genre) => {
    const newColor = genreColors[genre.toLowerCase()] || "#FF4500";
    setAccentColor(newColor);
    document.documentElement.style.setProperty("--accent", newColor); // Updates CSS variable
  };

  return (
    <ThemeContext.Provider value={{ accentColor, changeAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
