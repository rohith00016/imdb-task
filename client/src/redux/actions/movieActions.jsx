import axios from "axios";
import toast from "react-hot-toast";

// Action creators
const fetchMoviesRequest = () => ({
  type: "FETCH_MOVIES_REQUEST",
});

const fetchMoviesSuccess = (movies) => ({
  type: "FETCH_MOVIES_SUCCESS",
  payload: movies,
});

const fetchMoviesFailure = (error) => ({
  type: "FETCH_MOVIES_FAILURE",
  payload: error,
});

const fetchMovieByIdRequest = () => ({
  type: "FETCH_MOVIE_BY_ID_REQUEST",
});

const fetchMovieByIdSuccess = (movie) => ({
  type: "FETCH_MOVIE_BY_ID_SUCCESS",
  payload: movie,
});

const fetchMovieByIdFailure = (error) => ({
  type: "FETCH_MOVIE_BY_ID_FAILURE",
  payload: error,
});
const addMovieRequest = () => ({
  type: "ADD_MOVIE_REQUEST",
});

const addMovieSuccess = (movie) => ({
  type: "ADD_MOVIE_SUCCESS",
  payload: movie,
});

const addMovieFailure = (error) => ({
  type: "ADD_MOVIE_FAILURE",
  payload: error,
});

const updateMovieRequest = () => ({
  type: "UPDATE_MOVIE_REQUEST",
});

const updateMovieSuccess = (movie) => ({
  type: "UPDATE_MOVIE_SUCCESS",
  payload: movie,
});

const updateMovieFailure = (error) => ({
  type: "UPDATE_MOVIE_FAILURE",
  payload: error,
});

const deleteMovieRequest = () => ({
  type: "DELETE_MOVIE_REQUEST",
});

const deleteMovieSuccess = (movieId) => ({
  type: "DELETE_MOVIE_SUCCESS",
  payload: movieId,
});

const deleteMovieFailure = (error) => ({
  type: "DELETE_MOVIE_FAILURE",
  payload: error,
});

// Thunks for asynchronous operations
export const fetchMovies = (navigate) => {
  return async (dispatch) => {
    dispatch(fetchMoviesRequest());
    try {
      const response = await axios.get("/api/movies");
      dispatch(fetchMoviesSuccess(response.data));
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(fetchMoviesFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export const fetchMovieById = (movieId, navigate) => {
  return async (dispatch) => {
    dispatch(fetchMovieByIdRequest()); // Dispatch specific request action
    try {
      const response = await axios.get(`/api/movies/${movieId}`);
      dispatch(fetchMovieByIdSuccess(response.data)); // Dispatch specific success action
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(fetchMovieByIdFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export const addMovie = (movieData, navigate) => {
  return async (dispatch) => {
    dispatch(addMovieRequest());
    try {
      const response = await axios.post("/api/movies", movieData);
      dispatch(addMovieSuccess(response.data));
      toast.success("Successfully added");
      setTimeout(() => {
        navigate("/movies");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(addMovieFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export const updateMovie = (movieId, movieData, navigate) => {
  return async (dispatch) => {
    dispatch(updateMovieRequest());
    try {
      const response = await axios.put(`/api/movies/${movieId}`, movieData);
      dispatch(updateMovieSuccess(response.data));
      toast.success("Successfully updated");
      setTimeout(() => {
        navigate("/movies");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(updateMovieFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export const deleteMovie = (movieId, navigate) => {
  return async (dispatch) => {
    dispatch(deleteMovieRequest());
    try {
      await axios.delete(`/api/movies/${movieId}`);
      dispatch(deleteMovieSuccess(movieId));
      toast.success("Successfully deleted");
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(deleteMovieFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};
