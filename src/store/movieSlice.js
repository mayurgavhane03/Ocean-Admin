import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { sortMoviesByDate } from '../helpers/sortMovieByDate';

// Secret key for encryption/decryption
const secretKey = 'your-secret-key';

// Encrypt data before sending it to the server
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

// Decrypt data after receiving it from the server
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetch('http://localhost:5000/api/movies');
  const encryptedData = await response.json();
  const data = decryptData(encryptedData.data);
  return sortMoviesByDate(data);
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id) => {
  const response = await fetch(`http://localhost:5000/api/movies/${id}`);
  const encryptedData = await response.json();
  return decryptData(encryptedData.data);
});

export const fetchMoviesByGenre = createAsyncThunk('movies/fetchMoviesByGenre', async (genre) => {
  const response = await fetch(`http://localhost:5000/api/movies/genre/${genre}`);
  const encryptedData = await response.json();
  const data = decryptData(encryptedData.data);
  return sortMoviesByDate(data);
});

export const fetchMoviesByTitle = createAsyncThunk('movies/fetchMoviesByTitle', async (title, { getState }) => {
  const state = getState();
  const originalMovies = state.movies.originalMovies;
  const filteredMovies = originalMovies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
  return sortMoviesByDate(filteredMovies);
});




const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    originalMovies: [],
    status: 'idle',
    error: null,
    movieDetails: null,
    movieDetailsStatus: 'idle',
    movieDetailsError: null,
    genre: null,
    genreStatus: 'idle',
    genreError: null,
    searchResults: [],
    searchStatus: 'idle',
    searchError: null,
  },
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.items = state.originalMovies;
    },
    resetMovies: (state) => {
      state.items = [];
      state.originalMovies = [];
      state.status = 'idle';
      state.error = null;
      state.movieDetails = null;
      state.movieDetailsStatus = 'idle';
      state.movieDetailsError = null;
      state.genre = null;
      state.genreStatus = 'idle';
      state.genreError = null;
      state.searchResults = [];
      state.searchStatus = 'idle';
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.originalMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.movieDetailsStatus = 'loading';
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.movieDetailsStatus = 'succeeded';
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.movieDetailsStatus = 'failed';
        state.movieDetailsError = action.error.message;
      })
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.genreStatus = 'loading';
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.genreStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.genreStatus = 'failed';
        state.genreError = action.error.message;
      })
      .addCase(fetchMoviesByTitle.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(fetchMoviesByTitle.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
        state.items = action.payload;
      })
      .addCase(fetchMoviesByTitle.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message;
      });
  },
});

export const { setGenre, clearSearchResults, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
