import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetch('http://localhost:5000/api/movies');
  return response.json();
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id) => {
  const response = await fetch(`http://localhost:5000/api/movies/movies/${id}`);
  return response.json();
});

export const fetchMoviesByGenre = createAsyncThunk('movies/fetchMoviesByGenre', async (genre) => {
  const response = await fetch(`http://localhost:5000/api/movies/genre/${genre}`);
  return response.json();
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {   
    items: [],
    status: 'idle',
    error: null,
    movieDetails: null,
    movieDetailsStatus: 'idle',
    movieDetailsError: null,
    genre: null,
    genreStatus: 'idle',
    genreError: null,
  },
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
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
      });
  },
});

export const { setGenre } = moviesSlice.actions;
export default moviesSlice.reducer;
