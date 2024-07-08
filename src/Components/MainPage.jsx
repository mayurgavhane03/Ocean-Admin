import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies, fetchMoviesByGenre } from "../store/movieSlice";
import { Helmet } from "react-helmet";
import { telegramRequestGroup } from "../constant";

const MainPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const searchResults = useSelector((state) => state.movies.searchResults);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const genre = useSelector((state) => state.movies.genre);
  const searchStatus = useSelector((state) => state.movies.searchStatus);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    if (movieStatus === "idle") {
      if (genre) {
        dispatch(fetchMoviesByGenre(genre));
      } else {
        dispatch(fetchMovies());
      }
    }
  }, [movieStatus, dispatch, genre]);

  let content;

  // Shimmer UI
  const shimmerCards = Array.from({ length: moviesPerPage }).map((_, index) => (
    <div
      key={index}
      className="shimmer-wrapper flex lg:w-56 lg:p-4 rounded-lg lg:items-center lg:justify-center lg:flex-col"
    >
      <div className="shimmer w-[120px] lg:w-[200px] lg:h-[300px] h-[200px] rounded-lg mb-4"></div>
      <div className="flex flex-col">
        <div className="shimmer w-[200px]  ml-4 lg:w-[150px] h-5 rounded"></div>
        <div className="shimmer w-[200px] mt-3 ml-4 lg:w-[150px] h-5 rounded"></div>
        <div className="shimmer w-[80px] mt-3 ml-4 lg:w-[150px] h-5 rounded"></div>
      </div>
    </div>
  ));

  // Logic to paginate movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstMovie, indexOfLastMovie)
      : movies.slice(indexOfFirstMovie, indexOfLastMovie);

  if (movieStatus === "loading") {
    content = (
      <div className="flex flex-wrap lg:justify-center h-[100%] gap-6">
        {shimmerCards}
      </div>
    );
  } else if (searchResults.length === 0 && movies.length === 0) {
    content = (
      <div className="h-[100vh] flex-col items-center justify-center  ">
        <p className="text-white"> Movie not available 😔</p>
        <p className="text-white mt-5">
          {" "}
          📌If Movie not available then Request in our Telegram Group{" "}
          <a className=" text-blue-500 font-bold  " href={telegramRequestGroup}>
            {" "}
            HERE
          </a>
        </p>
      </div>
    );
  } else if (currentMovies.length > 0) {
    content = currentMovies.map((movie) => (
      <Link key={movie._id} to={`/movie/${movie._id}`} className="no-underline">
        <div className="flex lg:w-56 lg:p-4 rounded-lg lg:items-center lg:justify-center lg:flex-col">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-[120px] lg:w-[200px] rounded-lg mb-4"
          />
          <h3 className="text-[17px] ml-5 text-white font-semibold">
            {movie.title}
          </h3>
        </div>
      </Link>
    ));
  } else if (movieStatus === "succeeded" && movies.length === 0) {
    content = (
      <div className="h-[100vh]">
        <p className="text-white">Movie not available</p>
      </div>
    );
  } else if (movieStatus === "failed" || searchStatus === "failed") {
    content = <p className="text-white">{error}</p>;
  }

  // Pagination buttons
  const pageNumbers = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      (searchResults.length > 0 ? searchResults.length : movies.length) /
        moviesPerPage
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  let renderPageNumbers;
  if (pageNumbers.length > 10) {
    const lastPage = pageNumbers[pageNumbers.length - 1];
    let visiblePages;
    if (currentPage <= 6) {
      visiblePages = pageNumbers.slice(0, 7);
    } else if (currentPage >= lastPage - 4) {
      visiblePages = pageNumbers.slice(lastPage - 7, lastPage);
    } else {
      visiblePages = pageNumbers.slice(currentPage - 3, currentPage + 4);
    }

    renderPageNumbers = (
      <>
        {currentPage > 1 && (
          <>
            <button
              className="bg-white m-2 p-2"
              onClick={() => {
                setCurrentPage(1);
                window.scrollTo(0, 0);
              }}
            >
              1
            </button>
            {currentPage > 6 && <span className="text-white">...</span>}
          </>
        )}
        {visiblePages.map((number) => (
          <button
            key={number}
            className={`bg-white m-2 p-2 ${
              currentPage === number ? "font-bold" : ""
            }`}
            onClick={() => {
              setCurrentPage(number);
              window.scrollTo(0, 0);
            }}
          >
            {number}
          </button>
        ))}
        {currentPage < lastPage && (
          <>
            {currentPage < lastPage - 4 && (
              <span className="text-white">...</span>
            )}
            <button
              className="bg-white m-2 p-2"
              onClick={() => {
                setCurrentPage(lastPage);
                window.scrollTo(0, 0);
              }}
            >
              {lastPage}
            </button>
          </>
        )}
      </>
    );
  } else {
    renderPageNumbers = pageNumbers.map((number) => (
      <button
        className={`text-[#888888] hover:text-white m-2 p-2 ${
          currentPage === number ? "font-bold" : ""
        }`}
        key={number}
        onClick={() => {
          setCurrentPage(number);
          window.scrollTo(0, 0);
        }}
      >
        {number}
      </button>
    ));
  }

  return (
    <div className="p-8 lg:py-20 w-full min-h-screen bg-black">
      <Helmet>
        <title>Ocean Of Movies</title>
        <meta name="description" content={`Watch and download Any Movie`} />
      </Helmet>

      <h1 className="text-xl flex lg:ml-[138px] text-white font-bold mb-6">
        Latest Updates !
      </h1>
      <h1 className="hidden lg:block text-sm  lg:ml-[138px] text-white font-bold mb-6 absolute top-[45%] right-0 transform translate-x-[-50%] translate-y-[50%]">
    {movies.length}
</h1>

      <div className="flex flex-wrap  lg:justify-center h-[100%] gap-6">
        {content}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className={`text-[#888888] hover:text-white ${
            currentPage === 1 ? "hidden" : ""
          }`}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers}
        <button
          className={`text-[#888888] hover:text-white ${
            currentPage ===
            Math.ceil(
              (searchResults.length > 0
                ? searchResults.length
                : movies.length) / moviesPerPage
            )
              ? "hidden"
              : ""
          }`}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
          }}
          disabled={
            currentPage ===
            Math.ceil(
              (searchResults.length > 0
                ? searchResults.length
                : movies.length) / moviesPerPage
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainPage
