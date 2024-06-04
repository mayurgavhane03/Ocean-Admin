import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovies, fetchMoviesByGenre } from '../store/movieSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const searchResults = useSelector((state) => state.movies.searchResults);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const genre = useSelector((state) => state.movies.genre);
  const searchStatus = useSelector((state) => state.movies.searchStatus);

  useEffect(() => {
    if (movieStatus === 'idle') {
      if (genre) {
        dispatch(fetchMoviesByGenre(genre));
      } else {
        dispatch(fetchMovies());
      }
    }
  }, [movieStatus, dispatch, genre]);

  let content;

  if (searchStatus === 'loading' || movieStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (searchResults.length > 0) {
    content = searchResults.map((movie) => (
      <Link key={movie._id} to={`/movie/${movie._id}`} className="no-underline">
        <div className="border flex lg:w-48 lg:border lg:border-gray-300 lg:p-4 rounded-lg  lg:items-center lg:justify-center lg:flex-col border-gray-300">
          <img src={movie.imageUrl} alt={movie.title} className="w-full   rounded-lg mb-4" />
          <h3 className="text-xl text-white font-semibold">{movie.title}</h3>
        </div>
      </Link>
    ));
    // border border-gray-300 p-4 rounded-lg w-48 shadow-md hover:shadow-lg transition-shadow duration-200
  } else if (movieStatus === 'succeeded' && movies.length > 0) {
    content = movies.map((movie) => (
      <Link key={movie._id} to={`/movie/${movie._id}`} className="no-underline">
        <div className=" flex lg:w-48 lg:border lg:border-gray-300 lg:p-4 rounded-lg  lg:items-center lg:justify-center lg:flex-col  ">
          <img src={movie.imageUrl} alt={movie.title} className="w-[145px] mr-5 rounded-lg  mb-4" />
          <h3 className="text-[17px]   text-white font-semibold">{movie.title} </h3>
        </div>
      </Link>
    ));
  } else if (movieStatus === 'succeeded' && movies.length === 0) {
    content = <div className='h-[100vh]'>
      <p className="text-white">Movie not available</p>;
    </div>
  } else if (movieStatus === 'failed' || searchStatus === 'failed') {
    content = <p className="text-white">{error}</p>;
  }

  return (
    <div className="p-8 lg:py-20 w-full h-full bg-gray-900">
      <h1 className="text-xl flex lg:ml-[100px] text-white font-bold mb-6">Latest Updates !</h1>
      <div className="flex flex-wrap lg:justify-center  h-[100%] gap-6">
        {content}
      </div>
    </div>
  );
};

export default MainPage;
