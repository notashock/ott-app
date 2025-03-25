/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "#1F1F1F",
        primary: "#2C2C2C",
        accent: "--var(#FF8566)",
        text: "white",
        h_over: "#4d0f00",
        ac_hover: "#FF7050",
      },
    },
  },
  plugins: [],
}
