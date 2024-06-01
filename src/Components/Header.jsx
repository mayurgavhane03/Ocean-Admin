import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMoviesByGenre, setGenre } from "../store/movieSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    tvShows: false,
    hollywood: false,
  });

  const tvShowsRef = useRef(null);
  const hollywoodRef = useRef(null);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen({ ...dropdownOpen, [dropdown]: !dropdownOpen[dropdown] });
  };

  const handleClickOutside = (event) => {
    if (
      tvShowsRef.current &&
      !tvShowsRef.current.contains(event.target) &&
      hollywoodRef.current &&
      !hollywoodRef.current.contains(event.target)
    ) {
      setDropdownOpen({ tvShows: false, hollywood: false });
    }
  };

  const handleGenreClick = (genre) => {
    dispatch(setGenre(genre));
    dispatch(fetchMoviesByGenre(genre));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 text-lg font-bold">
              <Link to="/">KATMOVIEHD</Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Adult
                </Link>
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  K-Drama & More
                </Link>
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Anime
                </Link>
                <div className="relative" ref={hollywoodRef}>
                  <button
                    onClick={() => toggleDropdown("hollywood")}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Hollywood
                  </button>
                  {dropdownOpen.hollywood && (
                    <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={() => handleGenreClick("action")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Action
                        </button>
                        <button
                          onClick={() => handleGenreClick("adventure")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Adventure
                        </button>
                        <button
                          onClick={() => handleGenreClick("comedy")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Comedy
                        </button>
                        <button
                          onClick={() => handleGenreClick("dual-audio")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Dual Audio
                        </button>
                        <button
                          onClick={() => handleGenreClick("fantasy")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Fantasy
                        </button>
                        <button
                          onClick={() => handleGenreClick("history")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          History
                        </button>
                        <button
                          onClick={() => handleGenreClick("horror")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Horror
                        </button>
                        <button
                          onClick={() => handleGenreClick("thriller")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Thriller
                        </button>
                        <button
                          onClick={() => handleGenreClick("mystery")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Mystery
                        </button>
                        <button
                          onClick={() => handleGenreClick("romance")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Romance
                        </button>
                        <button
                          onClick={() => handleGenreClick("romance")}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Romance
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative" ref={tvShowsRef}>
                  <button
                    onClick={() => toggleDropdown("tvShows")}
                    className="text-gray-300 hover
hover
px-3 py-2 rounded-md text-sm font-medium"
                  >
                    TV Shows
                  </button>
                  {dropdownOpen.tvShows && (
                    <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Show 1
                        </Link>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Show 2
                        </Link>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Show 3
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Animated
                </Link>
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dub Movie
                </Link>
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Netflix
                </Link>
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Disney +
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Adult
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              K-Drama & More
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Anime
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Hollywood
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              TV Shows
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Animated
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dub Movie
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Netflix
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Disney +
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
