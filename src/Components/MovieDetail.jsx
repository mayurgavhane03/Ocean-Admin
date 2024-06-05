import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { JoinTelegram } from "../constant";
import { fetchMovieById } from "../store/movieSlice";
import { Helmet } from "react-helmet-async";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetails);
  const movieStatus = useSelector((state) => state.movies.movieDetailsStatus);
  const error = useSelector((state) => state.movies.movieDetailsError);

  useEffect(() => {
    if (movieStatus === "idle" || (movie && movie._id !== id)) {
      dispatch(fetchMovieById(id));
    }
  }, [id, movieStatus, movie, dispatch]);

  if (movieStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (movieStatus === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        {error}
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const areAllUrlsAvailable = () => {
    return Object.values(movie.allInOne).every((info) => info.url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <Helmet>
        <title>{movie.title} - OceanOfMovies</title>
        <meta name="description" content={`Watch and download ${movie.title}.`} />
      </Helmet>
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl text-white text-[24px] font-bold mb-10">
          {movie.title}
        </h1>
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-auto h-[500px] mx-auto rounded-lg mb-4"
        />
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img src={JoinTelegram} alt="Join Telegram" />
          </Link>
        </div>
        <div className="text-white">
          <p className="mb-2 font-bold text-blue-500 text-2xl">
            IMDb Rating: {movie.imdbRating}
          </p>
          <p className="mb-2 font-bold">
            Directors:{" "}
            <span className="font-normal">{movie.directors.join(", ")}</span>
          </p>
          <p className="mb-2 font-bold">
            Stars: <span className="font-normal">{movie.stars.join(", ")}</span>
          </p>
          <p className="mb-2 font-bold">
            Languages:{" "}
            <span className="font-normal">{movie.languages.join(", ")}</span>
          </p>
          <p className="mb-2 font-bold">
            Genres:{" "}
            <span className="font-bold text-blue-500 text-l">
              {movie.genres.join(", ")}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2 text-[#ff9900]">
            Screenshots
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {movie.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h1 className="text-red-500 font-serif font-semibold text-3xl">
            DOWNLOAD LINKS
          </h1>
        </div>
        <div className="mt-4">
          <div className="flex flex-col">
            {areAllUrlsAvailable() && (
              <div className="mb-2 flex justify-center items-center border-b border-white">
                <a
                  href={movie.allInOne.url}
                  className="text-blue-400 text-xl ml-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  All Qualities
                </a>
              </div>
            )}
            {Object.entries(movie.allInOne).map(
              ([quality, info]) =>
                info.url && (
                  <div
                    key={quality}
                    className="mb-2 text-2xl flex font-serif justify-center items-center border-b border-white"
                  >
                    <a
                      href={info.url}
                      className="text-blue-400 text-xl mb-3 mt-2 ml-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {quality.toUpperCase()} Link
                      <span className="ml-2">[{info.size}]</span>
                    </a>
                  </div>
                )
            )}

            <Link to="/">
              <h1 className="text-3xl text-blue-400 font-bold mt-10 mb-10">
                HOW TO DOWNLOAD
              </h1>
            </Link>
          </div>
        </div>
        {movie.type === "series" && (
          <div className="mt-8">
            <h2 className="text-red-500 font-semibold text-2xl">Episodes</h2>
            {movie.episodes.map((episode, index) => (
              <div
                key={index}
                className={`mt-4 ${
                  index === movie.episodes.length - 1
                    ? "border-t border-white pt-4"
                    : "border-t border-white pt-4"
                }`}
              >
                <div className="flex justify-center items-center mb-4">
                  <h3 className="text-xl font-bold text-[#ff9900]">
                    {episode.title}:{" "}
                  </h3>
                  {Object.entries(episode.qualities).map(([quality, url]) => (
                    <a
                      key={quality}
                      href={url}
                      className="text-blue-400 ml-3 font-bold "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {quality.toUpperCase()}
                    </a>
                  ))}
                </div>
                {index === movie.episodes.length - 1 && (
                  <div className="mb-2 text-2xl flex font-serif justify-center items-center border-b border-white" />
                )}
              </div>
            ))}
          </div>
        )}

        <h1 className="text-3xl mt-10 text-white mb-10 decoration-from-font  "><span className="  text-red-600 font-bold font-serif text-2xl "> DESCRIPTION  : </span>
          {movie.title} Available only on OceanOfMovie The Best Movie Site
        </h1>
      </div>
    </div>
  );
};

export default MovieDetail;
