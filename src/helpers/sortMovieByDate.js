export const sortMoviesByDate = (movies) => {
    return movies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  