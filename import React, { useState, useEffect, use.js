import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchMoviesByGenre,
  fetchMoviesByTitle,
  setGenre,
} from "../store/movieSlice";
import { LuSearch } from "react-icons/lu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    tvShows: false,
    hollywood: false,
  });
  const [searchTitle, setSearchTitle] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const tvShowsRef = useRef(null);
  const hollywoodRef = useRef(null);
  const searchInputRef = useRef(null); // Add this reference

  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.movies.searchResults);
  const searchStatus = useSelector((state) => state.movies.searchStatus);

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
      !hollywoodRef.current.contains(event.target) &&
      searchInputRef.current && // Add this condition
      !searchInputRef.current.contains(event.target)
    ) {
      setDropdownOpen({ tvShows: false, hollywood: false });
      setIsSearchOpen(false); // Close the search bar when clicking outside
    }
  };

  const handleGenreClick = (genre) => {
    dispatch(setGenre(genre));
    dispatch(fetchMoviesByGenre(genre));
  };

  const handleSearch = (e) => {
    const title = e.target.value;
    setSearchTitle(title);
    if (title) {
      dispatch(fetchMoviesByTitle(title));
    }
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 w-full text-gray-100">
      <div className="   mx-auto px-2 sm:px-6 lg:px-8">
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
                <button
                  onClick={() => handleGenreClick("adult")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Adult
                </button>
                <button
                  onClick={() => handleGenreClick("k-drama")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  K-Drama
                </button>
                <button
                  onClick={() => handleGenreClick("anime")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Animation
                </button>
                {/* Add more genre buttons here as needed */}
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
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative" ref={tvShowsRef}>
                  <button
                    onClick={() => toggleDropdown("tvShows")}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
                          Anime
                        </Link>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Cartoons
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTitle}
                onChange={handleSearch}
                className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleSearchBar}
              className="text-gray-300 hover:text-white focus:outline-none sm:hidden"
            >
              <LuSearch className="h-6 w-6 -ml-12" />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleGenreClick("adult")}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Adult
              </button>
              <button
                onClick={() => handleGenreClick("k-drama")}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                K-Drama
              </button>
              <button
                onClick={() => handleGenreClick("anime")}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Anime
              </button>
              {/* Add more genre buttons here as needed */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("hollywood")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("tvShows")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
                        Anime
                      </Link>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        role="menuitem"
                      >
                        Cartoons
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {isSearchOpen && (
        <div className="px-2 pt-2 pb-3 space-y-1">
          <input
            type="text"
            placeholder="Search"
            value={searchTitle}
            onChange={handleSearch}
            className="block w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ref={searchInputRef} // Add this ref to the input
          />
        </div>
      )}
    </nav>
  );
};

export default Header;



onst DropdownMenu = ({ label, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    onItemClick(item.toLowerCase());
    setIsOpen(false); 
  };

  return (
    <div className="relative sm:ml-36">
      <div className="flex justify-center items-center">
        <button
          onClick={toggleDropdown}
          className="peer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
        >
          {label} <FaChevronDown className={`ml-2 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>

      
      {isOpen && (
        <div
          className="absolute sm:mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
          style={{ top: '100%', right: '0', left: 'auto' }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item) => (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                role="menuitem"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 640px) {
          .absolute {
            right: auto !important;
            left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
