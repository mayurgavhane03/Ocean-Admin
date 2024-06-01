import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovies, fetchMoviesByGenre, setGenre } from '../store/movieSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const genre = useSelector((state) => state.movies.genre);

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

  if (movieStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (movieStatus === 'succeeded') {
    content = movies.map((movie) => (
      <Link key={movie._id} to={`/movie/${movie._id}`} className="no-underline">
        <div className="border border-gray-300 p-4 rounded-lg w-48 shadow-md hover:shadow-lg transition-shadow duration-200">
          <img src={movie.imageUrl} alt={movie.title} className="w-full rounded-lg mb-4" />
          <h3 className="text-xl text-white font-semibold">{movie.title}</h3>
        </div>
      </Link>
    ));
  } else if (movieStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="flex flex-wrap gap-6">
        {content}
      </div>
    </div>
  );
};

export default MainPage;
