import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateData = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    type: "",
    imdbRating: "",
    directors: [],
    stars: [],
    languages: [],
    screenshots: [],
    genres: [],
    allInOne: {
      '480p': { url: "", size: "" },
      '720p': { url: "", size: "" },
      '1080p': { url: "", size: "" }
    },
    episodes: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        const data = response.data;
        setFormData({
          title: data.title || "",
          imageUrl: data.imageUrl || "",
          type: data.type || "",
          imdbRating: data.imdbRating || "",
          directors: data.directors || [],
          stars: data.stars || [],
          languages: data.languages || [],
          screenshots: data.screenshots || [],
          genres: data.genres || [],
          allInOne: data.allInOne || {
            '480p': { url: "", size: "" },
            '720p': { url: "", size: "" },
            '1080p': { url: "", size: "" }
          },
          episodes: data.episodes || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

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
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleEpisodeChange = (e, index) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split(".");
    const episodes = [...formData.episodes];
    if (subfield) {
      episodes[index][field][subfield] = value;
    } else {
      episodes[index][field] = value;
    }
    setFormData((prevData) => ({
      ...prevData,
      episodes,
    }));
  };

  const addEpisode = () => {
    setFormData((prevData) => ({
      ...prevData,
      episodes: [
        ...prevData.episodes,
        { title: "", qualities: { '480p': "", '720p': "", '1080p': "" } },
      ],
    }));
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

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const response = await uploadImage(file);
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: response.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScreenshotsUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    try {
      setIsLoading(true);
      const urls = [];

      for (const file of files) {
        const response = await uploadImage(file);
        urls.push(response.secure_url);
      }

      setFormData((prevData) => ({
        ...prevData,
        screenshots: [...prevData.screenshots, ...urls],
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(`http://localhost:5000/api/movies/${id}`, formData);
      console.log("Movie updated:", response.data);
      alert("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

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
          <input
            type="file"
            accept="image/*"
            id="imageUrl"
            onChange={handleMainImageUpload}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
          {formData.imageUrl && (
            <div className="relative">
              <img
                src={formData.imageUrl}
                alt="Main"
                className="mt-2 w-32 h-auto"
              />
              <button
                type="button"
                onClick={() => setFormData((prevData) => ({ ...prevData, imageUrl: "" }))}
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
          <input
            type="file"
            accept="image/*"
            id="screenshots"
            multiple
            onChange={handleScreenshotsUpload}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          />
          {formData.screenshots.length > 0 && (
            <div className="mt-2 flex flex-wrap">
              {formData.screenshots.map((imageUrl, index) => (
                <div key={index} className="relative mr-2 mb-2">
                  <img
                    src={imageUrl}
                    alt={`Screenshot ${index + 1}`}
                    className="w-24 h-auto"
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
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block mb-1">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option            value="anime">Anime</option>
            <option value="18">18+</option>
            <option value="k-drama">K-Drama</option>
            <option value="netflix">Netflix</option>
            <option value="amazon">Amazon</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="imdbRating" className="block mb-1">
            IMDb Rating
          </label>
          <input
            type="number"
            id="imdbRating"
            name="imdbRating"
            value={formData.imdbRating}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
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
          <label htmlFor="allInOne" className="block mb-1">
            All In One
          </label>
          <div className="flex flex-col space-y-2">
            {["480p", "720p", "1080p"].map((quality) => (
              <div key={quality} className="flex items-center space-x-2">
                <label className="w-20">{quality} URL</label>
                <input
                  type="text"
                  name={`allInOne.${quality}.url`}
                  value={formData.allInOne[quality].url}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
                />
                <label className="w-20">{quality} Size</label>
                <input
                  type="text"
                  name={`allInOne.${quality}.size`}
                  value={formData.allInOne[quality].size}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
                />
              </div>
            ))}
          </div>
        </div>
        {formData.type === "series" && (
          <div className="mb-4">
            <label className="block mb-1">Episodes</label>
            {formData.episodes.map((episode, index) => (
              <div key={index} className="mb-4 border-b border-gray-700 pb-4">
                <div className="mb-2">
                  <label className="block mb-1">Episode Title</label>
                  <input
                    type="text"
                    name="title"
                    value={episode.title}
                    onChange={(e) => handleEpisodeChange(e, index)}
                    className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  {["480p", "720p", "1080p"].map((quality) => (
                    <div key={quality} className="flex items-center space-x-2">
                      <label className="w-20">{quality} URL</label>
                      <input
                        type="text"
                        name={`qualities.${quality}`}
                        value={episode.qualities[quality]}
                        onChange={(e) => handleEpisodeChange(e, index)}
                        className="flex-1 px-3 py-2 bg-gray-800 rounded text-white outline-none focus:bg-gray-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addEpisode}
              className="w-full py-2 bg-green-600 rounded text-white hover:bg-green-700 transition duration-200"
            >
              Add Episode
            </button>
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition duration-200"
        >
          {isLoading ? "Updating..." : "Update Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateData;

