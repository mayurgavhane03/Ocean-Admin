import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
 
 
 


import CryptoJS from 'crypto-js';

const secretKey = 'MNMN0808';  // Replace with your actual secret key

export const fetchMovies = async () => {
  const response = await fetch('http://localhost:5000/api/movies');
  const encryptedData = await response.json();
  const bytes = CryptoJS.AES.decrypt(encryptedData.data, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return sortMoviesByDate(decryptedData);
};

const sortMoviesByDate = (movies) => {
  return movies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};




const ShowData = () => {
  const [movies, setMovies] = useState([]);
    const [refresh,setrefresh] = useState(false)
  useEffect(() => {
    fetchMovies()
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [refresh]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setMovies(movies.filter(movie => movie._id !== id));
        setrefresh(true)
      })
      .catch(error => console.error('Error deleting movie:', error));
  };

  return (
    <div className="p-8 bg-black text-white">
      <h1 className="text-[17px] font-bold mb-6">Movies</h1>
      <div className="flex flex-wrap gap-6">
        {movies.map(movie => (
          <div key={movie._id} className="border r justify-center  border-gray-300 p-4 rounded-lg w-48 shadow-md hover:shadow-lg transition-shadow duration-200">
            <Link to={`/mayur/${movie._id}`} className="no-underline">
              <img src={movie.imageUrl} alt={movie.title} className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{movie.title}</h3>
            </Link>
            <button onClick={() => handleDelete(movie._id)} className="text-red-500 text-2xl mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowData;
