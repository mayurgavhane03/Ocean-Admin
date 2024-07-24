import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { JoinTelegram, Telegram } from "../constant";
import { fetchMovieById, updateMovieById } from "../store/movieSlice";
import { Helmet } from "react-helmet-async";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetails);
  const movieStatus = useSelector((state) => state.movies.movieDetailsStatus);
  const error = useSelector((state) => state.movies.movieDetailsError);

  const [formData, setFormData] = useState({
    title: "",
    imdbRating: "",
    directors: [],
    stars: [],
    languages: [],
    genres: [],
    screenshots: [],
    allInOne: {},
    episodes: [],
    type: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (movieStatus === "idle" || (movie && movie._id !== id)) {
      dispatch(fetchMovieById(id));
    }
  }, [id, movieStatus, movie, dispatch]);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        imdbRating: movie.imdbRating || "",
        directors: movie.directors || [],
        stars: movie.stars || [],
        languages: movie.languages || [],
        genres: movie.genres || [],
        screenshots: movie.screenshots || [],
        allInOne: movie.allInOne || {},
        episodes: movie.episodes || [],
        type: movie.type || "",
        imageUrl: movie.imageUrl || "",
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.split(","),
    }));
  };

  const handleAllInOneChange = (quality, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      allInOne: {
        ...prevData.allInOne,
        [quality]: {
          ...prevData.allInOne[quality],
          [field]: value,
        },
      },
    }));
  };

  const handleEpisodeChange = (index, field, value) => {
    const updatedEpisodes = formData.episodes.map((episode, i) =>
      i === index ? { ...episode, [field]: value } : episode
    );
    setFormData((prevData) => ({
      ...prevData,
      episodes: updatedEpisodes,
    }));
  };

  const handleEpisodeQualityChange = (index, quality, value) => {
    const updatedEpisodes = formData.episodes.map((episode, i) =>
      i === index
        ? {
            ...episode,
            qualities: {
              ...episode.qualities,
              [quality]: value,
            },
          }
        : episode
    );
    setFormData((prevData) => ({
      ...prevData,
      episodes: updatedEpisodes,
    }));
  };

  const handleDeleteEpisode = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      episodes: prevData.episodes.filter((_, i) => i !== index),
    }));
  };
  const handleUpdate = () => {
    const updatedMovieData = {
      ...formData,
      createdAt: new Date().toISOString(), // Update createdAt field with current date and time
    };
    dispatch(updateMovieById({ id, ...updatedMovieData }));
  };
  

  if (movieStatus === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (movieStatus === "failed") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <Helmet>
        <title>{formData.title} - OceanOfMovies</title>
        <meta
          name="description"
          content={`Watch and download ${formData.title}.`}
        />
      </Helmet>
      <div className="text-center max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white font-bold mb-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
        </h1>
        <img
          src={formData.imageUrl}
          alt={formData.title}
          className="w-full h-auto mx-auto rounded-lg mb-4"
        />
        <div className="flex justify-center mb-4">
          <a href={Telegram} target="_blank" rel="noopener noreferrer">
            <img src={JoinTelegram} alt="Join Telegram" />
          </a>
        </div>
        <div className="text-white">
          <div className="mb-4">
            <label className="block font-bold mb-1">IMDb Rating:</label>
            <input
              type="text"
              name="imdbRating"
              value={formData.imdbRating}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Directors:</label>
            <input
              type="text"
              name="directors"
              value={formData.directors.join(", ")}
              onChange={(e) => handleArrayChange("directors", e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Stars:</label>
            <input
              type="text"
              name="stars"
              value={formData.stars.join(", ")}
              onChange={(e) => handleArrayChange("stars", e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Languages:</label>
            <input
              type="text"
              name="languages"
              value={formData.languages.join(", ")}
              onChange={(e) => handleArrayChange("languages", e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Genres:</label>
            <input
              type="text"
              name="genres"
              value={formData.genres.join(", ")}
              onChange={(e) => handleArrayChange("genres", e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Screenshots:</label>
            <div className="grid grid-cols-2 gap-4">
              {formData.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
            <input
              type="text"
              name="screenshots"
              value={formData.screenshots.join(", ")}
              onChange={(e) => handleArrayChange("screenshots", e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">All In One:</label>
            {Object.keys(formData.allInOne).map((quality) => (
              <div key={quality} className="mb-2">
                <input
                  type="text"
                  value={formData.allInOne[quality].url}
                  onChange={(e) =>
                    handleAllInOneChange(quality, "url", e.target.value)
                  }
                  placeholder={`${quality.toUpperCase()} URL`}
                  className="w-full p-2 rounded bg-gray-900 text-white mb-2"
                />
                <input
                  type="text"
                  value={formData.allInOne[quality].size}
                  onChange={(e) =>
                    handleAllInOneChange(quality, "size", e.target.value)
                  }
                  placeholder={`${quality.toUpperCase()} Size`}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block font-bold mb-1">Episodes:</label>
            {formData.episodes.map((episode, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-700 rounded">
                <input
                  type="text"
                  name={`episodeTitle-${index}`}
                  value={episode.title}
                  onChange={(e) =>
                    handleEpisodeChange(index, "title", e.target.value)
                  }
                  placeholder="Episode Title"
                  className="w-full p-2 rounded bg-gray-900 text-white mb-2"
                />
                {Object.keys(episode.qualities).map((quality) => (
                  <input
                    key={quality}
                    type="text"
                    name={`episodeQuality-${index}-${quality}`}
                    value={episode.qualities[quality]}
                    onChange={(e) =>
                      handleEpisodeQualityChange(index, quality, e.target.value)
                    }
                    placeholder={`${quality.toUpperCase()} Quality URL`}
                    className="w-full p-2 rounded bg-gray-900 text-white mb-2"
                  />
                ))}
                <button
                  onClick={() => handleDeleteEpisode(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  episodes: [
                    ...prevData.episodes,
                    {
                      title: "",
                      qualities: { "480p": "", "720p": "", "1080p": "" },
                    },
                  ],
                }))
              }
              className="px-4 py-2 bg-green-500 text-white rounded mt-4"
            >
              Add New Episode
            </button>
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          Update Movie
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
