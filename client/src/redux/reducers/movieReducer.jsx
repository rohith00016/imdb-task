const initialState = {
  movies: [],
  topMovies: [],
  movie: null,
  loading: false,
  error: null
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
    case 'FETCH_MOVIE_BY_ID_REQUEST':
    case 'ADD_MOVIE_REQUEST':
    case 'UPDATE_MOVIE_REQUEST':
    case 'DELETE_MOVIE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_MOVIES_SUCCESS':
      return { ...state, loading: false, movies: action.payload, error: null };
    case 'FETCH_MOVIE_BY_ID_SUCCESS':
      return { ...state, loading: false, movie: action.payload, error: null };
    case 'FETCH_MOVIES_FAILURE':
    case 'FETCH_MOVIE_BY_ID_FAILURE':
    case 'ADD_MOVIE_FAILURE':
    case 'UPDATE_MOVIE_FAILURE':
    case 'DELETE_MOVIE_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_MOVIE_SUCCESS':
      return { ...state, loading: false, movies: [...state.movies, action.payload], error: null };
    case 'UPDATE_MOVIE_SUCCESS':
      const updatedMovies = state.movies.map(movie => movie._id === action.payload._id ? action.payload : movie);
      return { ...state, loading: false, movies: updatedMovies, error: null };
    case 'DELETE_MOVIE_SUCCESS':
      const remainingMovies = state.movies.filter(movie => movie._id !== action.payload);
      return { ...state, loading: false, movies: remainingMovies, error: null };
    default:
      return state;
  }
};

export default movieReducer;
