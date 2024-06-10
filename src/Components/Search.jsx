import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesByTitle, resetMovies } from '../store/movieSlice';
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const searchTitleRef = useRef('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const title = e.target.value;
    searchTitleRef.current = title;
    if (title) {
      dispatch(fetchMoviesByTitle(title));
      navigate(`/?title=${title}`);
    } else {
      dispatch(resetMovies());
      navigate('/');
    }
  };

  return (
    <div className="search-container relative  bg-[#121212] mt-1">
      <input
        type="text"
        ref={searchTitleRef}
        onChange={handleSearch}
        className="search-input px-3 py-3 rounded-2xl text-sm text-gray-500 bg-[#1F1F1F] focus:outline-none"
        placeholder="Search Movies..."
      />
      <FiSearch className="search-icon mr-3  absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
    </div>
  );
};

export default Search;
