import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { fetchMoviesByGenre, fetchMoviesByType, setGenre } from "../store/movieSlice";
import { FaChevronDown } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import Search from "./Search";

const DropdownMenu = ({ label, items, onItemClick, isOpen, onToggle }) => {
  const handleItemClick = (item) => {
    onItemClick(item.toLowerCase());
    onToggle(false);
  };

  return (
    <div className=" lg:relative    ">
      <div className="flex justify-center items-center">
        <button
          onClick={() => onToggle(!isOpen)}
          className="peer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
        >
          {label} <FaChevronDown className={`ml-2 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute sm:mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
          style={{ top: '4%', right: 'auto', left: '40%' }}
          onMouseLeave={() => onToggle(false)}
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
            right: 0; 
          }
        }
      `}</style>
    </div>
  );
};

const NavLinks = ({ onGenreClick, onTypeClick }) => {
  const genres = [
    { label: "Adult", genre: "adult" },
    { label: "Bollywood", genre: "bollywood" },
    { label: "K-Drama", genre: "kdrama" },
    { label: "Animated", genre: "Animation" },
    { label: "Netflix", genre: "netflix" },
  ];

  return (
    <>
      {genres.map((link) => (
        <button
          key={link.label}
          onClick={() => onGenreClick(link.genre)}
          className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          {link.label}
        </button>
      ))}
      
    </>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // State to manage active dropdown
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate




  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };
  
  const handleGenreClick = (genre) => {
    dispatch(setGenre(genre));
    if (genre === "bollywood") {
      dispatch(fetchMoviesByType("bollywood"));
    }  if (genre === "netflix") {
      dispatch(fetchMoviesByType("netflix"));
    } else {
      dispatch(fetchMoviesByGenre(genre));
    }
    setIsOpen(false);
    navigate("/"); // Navigate to the main page
  };

  const handleTypeClick = (type) => {
    dispatch(fetchMoviesByType(type));
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#121212] text-gray-100 p-2">
      <div className=" mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Toggle menu</span>
              <FaBars />
            </button>
          </div>
          <div className=" lg:ml-20  flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0  text-lg font-bold">
              <a className="text-3xl" href="/">
             <img className="h-[250px]" src="https://res.cloudinary.com/doi13tpyz/image/upload/v1717696562/logo-color-removebg-preview_dvvu3j.png" alt="" />
              </a>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={toggleSearch}
              className="text-gray-400 hover:text-white focus:outline-none sm:hidden"
            >
              <LuSearch />
            </button>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="flex space-x-4">
              <NavLinks onGenreClick={handleGenreClick} onTypeClick={handleTypeClick} />
              <DropdownMenu
                label="Hollywood"
                items={[
                  "Action",
                  "Adventure",
                  "Comedy",
                  "Fantasy",
                  "History",
                  "Horror",
                  "Thriller",
                  "Mystery",
                  "Romance",
                ]}
                isOpen={activeDropdown === "hollywood"}
                onToggle={(isOpen) => handleDropdownToggle(isOpen ? "hollywood" : null)}
                onItemClick={handleGenreClick}
              />
              {/* <DropdownMenu
                label="TV Shows"
                items={["Show 1", "Show 2", "Show 3"]}
                isOpen={activeDropdown === "tvshows"}
                onToggle={(isOpen) => handleDropdownToggle(isOpen ? "tvshows" : null)}
                onItemClick={handleGenreClick}
              /> */}
              <div className="relative search-container hidden sm:block">
                <Search />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-gray-900 shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-start">
          <button
            onClick={toggleMenu}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
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
          </button>
          <NavLinks onGenreClick={handleGenreClick} onTypeClick={handleTypeClick} />
          <DropdownMenu
            label="Hollywood"
            items={[
              "Action",
              "Adventure",
              "Comedy",
              "Fantasy",
              "History",
              "Horror",
              "Thriller",
              "Mystery",
              "Romance",
            ]}
            isOpen={activeDropdown === "hollywood"}
            onToggle={(isOpen) => handleDropdownToggle(isOpen ? "hollywood" : null)}
            onItemClick={handleGenreClick}
          />
          <DropdownMenu
            label="TV Shows"
            items={["Show 1", "Show 2", "Show 3"]}
            isOpen={activeDropdown === "tvshows"}
            onToggle={(isOpen) => handleDropdownToggle(isOpen ? "tvshows" : null)}
            onItemClick={handleGenreClick}
          />
        </div>
      </div>
      {isSearchOpen && (
        <div className="flex justify-center items-center top-16 w-full z-50">
          <div>
            <Search />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
