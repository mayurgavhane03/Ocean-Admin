import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    screenshots: [],
    type: "",
    imdbRating: "",
    directors: [],
    stars: [],
    languages: [],
    genres: [],
    allInOne: {
      "480p": { url: "", size: "" },
      "720p": { url: "", size: "" },
      "1080p": { url: "", size: "" },
    },
    episodes: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [newEpisode, setNewEpisode] = useState({
    title: "",
    qualities: { "480p": "", "720p": "", "1080p": "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield, subsubfield] = name.split(".");

    if (subsubfield) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subfield]: {
            ...prevData[field][subfield],
            [subsubfield]: value,
          },
        },
      }));
    } else if (subfield) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subfield]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleEpisodeChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split(".");

    if (field === "qualities" && subfield) {
      setNewEpisode((prevData) => ({
        ...prevData,
        qualities: {
          ...prevData.qualities,
          [subfield]: value,
        },
      }));
    } else {
      setNewEpisode({
        ...newEpisode,
        [name]: value,
      });
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mern_product");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doi13tpyz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    return response.json();
  };

  const handleMainImageUpload = async (file) => {
    if (!file) return;

    try {
      setIsLoading(true);
      const response = await uploadImage(file);
      setFormData({
        ...formData,
        imageUrl: response.secure_url,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScreenshotsUpload = useCallback(async (files) => {
    if (!files.length) return;

    try {
      setIsLoading(true);
      const urls = await Promise.all(
        files.map(async (file) => {
          const response = await uploadImage(file);
          return response.secure_url;
        })
      );

      setFormData((prevData) => ({
        ...prevData,
        screenshots: [...prevData.screenshots, ...urls],
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddEpisode = () => {
    setFormData((prevData) => ({
      ...prevData,
      episodes: [...prevData.episodes, newEpisode],
    }));
    setNewEpisode({
      title: "",
      qualities: { "480p": "", "720p": "", "1080p": "" },
    });
  };

  const handleRemoveEpisode = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      episodes: prevData.episodes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const allInOne = formData.allInOne || {
        "480p": { url: "", size: "" },
        "720p": { url: "", size: "" },
        "1080p": { url: "", size: "" },
      };

      const episodes = formData.episodes || [];

      const dataToSend = {
        ...formData,
        allInOne,
        episodes,
        imdbRating: formData.imdbRating === "" ? "-" : formData.imdbRating,
      };

      const response = await axios.post(
        "http://localhost:5000/api/movies",
        dataToSend
      );
      console.log("Movie created:", response.data);

      alert("Movie created successfully!");

      setFormData({
        title: "",
        imageUrl: "",
        screenshots: [],
        type: "",
        imdbRating: "",
        directors: [],
        stars: [],
        languages: [],
        genres: [],
        allInOne: {
          "480p": { url: "", size: "" },
          "720p": { url: "", size: "" },
          "1080p": { url: "", size: "" },
        },
        episodes: [],
      });
    } catch (error) {
      console.error("Error creating movie:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDropMainImage = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      await handleMainImageUpload(acceptedFiles[0]);
    }
  }, []);

  const onDropScreenshots = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      await handleScreenshotsUpload(acceptedFiles);
    }
  }, [handleScreenshotsUpload]);

  const { getRootProps: getMainImageRootProps, getInputProps: getMainImageInputProps } = useDropzone({
    onDrop: onDropMainImage,
    accept: "image/*"
  });

  const { getRootProps: getScreenshotsRootProps, getInputProps: getScreenshotsInputProps } = useDropzone({
    onDrop: onDropScreenshots,
    accept: "image/*",
    multiple: true
  });

  return (
    <div className="bg-black text-white p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block mb-1">
            Main Image
          </label>
          <div
            {...getMainImageRootProps()}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700 cursor-pointer"
          >
            <input {...getMainImageInputProps()} />
            <p>Drag 'n' drop a main image here, or click to select one</p>
          </div>
          {formData.imageUrl && (
            <div className="relative">
              <img
                src={formData.imageUrl}
                alt="Main"
                className="mt-2 w-32 h-auto"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                className="absolute top-2 right-2 text-white focus:outline-none"
              >
                ❌
              </button>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="screenshots" className="block mb-1">
            Screenshots
          </label>
          <div
            {...getScreenshotsRootProps()}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700 cursor-pointer"
          >
            <input {...getScreenshotsInputProps()} />
            <p>Drag 'n' drop screenshots here, or click to select</p>
          </div>
          {formData.screenshots.map((screenshot, index) => (
            <div key={index} className="relative inline-block mr-2">
              <img
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="mt-2 w-32 h-auto"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    screenshots: prevData.screenshots.filter(
                      (_, i) => i !== index
                    ),
                  }))
                }
                className="absolute top-2 right-2 text-white focus:outline-none"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block mb-1">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imdbRating" className="block mb-1">
            IMDb Rating
          </label>
          <input
            type="text"
            id="imdbRating"
            name="imdbRating"
            value={formData.imdbRating}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="directors" className="block mb-1">
            Directors
          </label>
          <input
            type="text"
            id="directors"
            name="directors"
            value={formData.directors.join(", ")}
            onChange={handleArrayChange}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stars" className="block mb-1">
            Stars
          </label>
          <input
            type="text"
            id="stars"
            name="stars"
            value={formData.stars.join(", ")}
            onChange={handleArrayChange}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="languages" className="block mb-1">
            Languages
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={formData.languages.join(", ")}
            onChange={handleArrayChange}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genres" className="block mb-1">
            Genres
          </label>
          <input
            type="text"
            id="genres"
            name="genres"
            value={formData.genres.join(", ")}
            onChange={handleArrayChange}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">All-in-One URLs</label>
          {Object.keys(formData.allInOne).map((quality) => (
            <div key={quality} className="mb-2">
              <label htmlFor={`allInOne.${quality}.url`} className="block mb-1">
                {quality.toUpperCase()} URL
              </label>
              <input
                type="text"
                id={`allInOne.${quality}.url`}
                name={`allInOne.${quality}.url`}
                value={formData.allInOne[quality].url}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
              />
              <label
                htmlFor={`allInOne.${quality}.size`}
                className="block mt-1 mb-1"
              >
                {quality.toUpperCase()} Size
              </label>
              <input
                type="text"
                id={`allInOne.${quality}.size`}
                name={`allInOne.${quality}.size`}
                value={formData.allInOne[quality].size}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Episodes</label>
          {formData.episodes.map((episode, index) => (
            <div key={index} className="mb-2">
              <label htmlFor={`episode.${index}.title`} className="block mb-1">
                Episode Title
              </label>
              <input
                type="text"
                id={`episode.${index}.title`}
                name={`episode.${index}.title`}
                value={episode.title}
                onChange={(e) => handleEpisodeChange(e, index)}
                className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
              />
              {Object.keys(episode.qualities).map((quality) => (
                <div key={quality} className="mb-2">
                  <label
                    htmlFor={`episode.${index}.qualities.${quality}`}
                    className="block mb-1"
                  >
                    {quality.toUpperCase()} URL
                  </label>
                  <input
                    type="text"
                    id={`episode.${index}.qualities.${quality}`}
                    name={`episode.${index}.qualities.${quality}`}
                    value={episode.qualities[quality]}
                    onChange={(e) => handleEpisodeChange(e, index)}
                    className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleRemoveEpisode(index)}
                className="mt-2 bg-red-600 px-3 py-1 rounded text-white"
              >
                Remove Episode
              </button>
            </div>
          ))}
          <div>
            <label htmlFor="newEpisode.title" className="block mb-1">
              New Episode Title
            </label>
            <input
              type="text"
              id="newEpisode.title"
              name="title"
              value={newEpisode.title}
              onChange={handleEpisodeChange}
              className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
            />
            {Object.keys(newEpisode.qualities).map((quality) => (
              <div key={quality} className="mb-2">
                <label
                  htmlFor={`newEpisode.qualities.${quality}`}
                  className="block mb-1"
                >
                  {quality.toUpperCase()} URL
                </label>
                <input
                  type="text"
                  id={`newEpisode.qualities.${quality}`}
                  name={`qualities.${quality}`}
                  value={newEpisode.qualities[quality]}
                  onChange={handleEpisodeChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEpisode}
              className="mt-2 bg-blue-600 px-3 py-1 rounded text-white"
            >
              Add Episode
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-600 px-4 py-2 rounded text-white"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
