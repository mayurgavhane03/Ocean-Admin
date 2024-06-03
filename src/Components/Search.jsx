import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesByTitle, resetMovies } from '../store/movieSlice';
// import { fetchMoviesByTitle, resetMovies } from '../store/movieSlice';

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
      dispatch(resetMovies()); // Assuming you have an action to reset the movies
      navigate('/');
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        ref={searchTitleRef}
        onChange={handleSearch}
        className="px-3 py-2 rounded-md text-sm text-gray-900"
        placeholder="Search Movies..."
      />
    </div>
  );
};

export default Search;
