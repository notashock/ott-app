import React, { useState } from 'react'

const themeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(true);
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if(darkMode) documentElement.classList.remove("dark");
        else documentElement.classList.add("dark")
    }
  return (
    <button onClick={toggleTheme} className = "px-4 py-2 rounded-md bg-[#FF8566] text-white hover:bg-[#FF7050]">
        {darkMode ? "Light" : "Dark"}
    </button>
  )
}

export default themeSwitcher
