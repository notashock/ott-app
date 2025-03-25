import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider"; // Import ThemeProvider hook
import { FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar = ({ currentGenre }) => {
  const location = useLocation();
  const { accentColor, changeAccentColor } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    if (currentGenre) {
      changeAccentColor(currentGenre);
    }
  }, [currentGenre, changeAccentColor]);

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  const getNavClass = (path) =>
    `px-4 py-2 rounded-lg transition-all duration-500 ${
      location.pathname === path ? `bg-[${accentColor}] text-text scale-105` : "hover:bg-gray-700"
    }`;

  return (
    <nav 
      className="flex justify-between items-center w-screen max-w-screen-xl bg-primary p-4 rounded-lg relative transition-all duration-500"
      style={{ boxShadow: `0px 4px 10px ${accentColor}80` }} // Dynamic shadow color
    >
      {/* CineVibe Logo */}
      <h1 className={`text-3xl font-bold text-text transition-all duration-500 ${
        searchVisible ? "opacity-50 scale-90 -translate-x-4" : "opacity-100 scale-100"
      }`}>
        CineVibe
      </h1>

      {/* Navigation Links */}
      {!location.pathname.includes("/login") && !location.pathname.includes("/signup") && (
        <div className={`flex gap-8 transition-all duration-500 ${
          searchVisible ? "-translate-x-8 opacity-50" : "translate-x-0 opacity-100"
        }`}>
          <Link className={getNavClass("/")} to="/">Home</Link>
          <Link className={getNavClass("/movies")} to="/movies">Movies</Link>
          <Link className={getNavClass("/watchlist")} to="/watchlist">Watchlist</Link>
        </div>
      )}

      {/* Search Bar / Icon */}
      <div className="flex items-center gap-6">
        {!location.pathname.includes("/login") && !location.pathname.includes("/signup") && (
          <>
            {!searchVisible ? (
              <button
                onClick={toggleSearch}
                className="text-text text-2xl p-2 rounded-full transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              >
                <FaSearch />
              </button>
            ) : (
              <div className={`relative transition-all duration-500 ${
                searchVisible ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 translate-x-8 pointer-events-none"
              }`}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-mainBg text-text rounded-lg pl-4 pr-12 py-2 outline-none focus:ring-2 focus:ring-accent w-full transition-all duration-500 focus:scale-105"
                />
                <button
                  onClick={toggleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  <FaSearch className="text-white text-sm" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Profile Icon & Dropdown */}
        {!location.pathname.includes("/login") && !location.pathname.includes("/signup") && (
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-text text-3xl transition-all duration-300 hover:scale-110"
            >
              <FaUserCircle />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute right-0 mt-2 w-48 bg-primary text-text rounded-lg shadow-lg p-4 transition-all duration-300 transform ${
              menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            }`}>
              <Link to="/account" className="block px-4 py-2 hover:bg-gray-700 rounded-lg transition-all duration-300">Account</Link>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-700 rounded-lg transition-all duration-300">Settings</Link>
              <button className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg transition-all duration-300">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
