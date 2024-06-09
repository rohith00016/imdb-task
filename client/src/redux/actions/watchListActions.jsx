import axios from "axios";
import toast from "react-hot-toast";

export const ADD_TO_WATCHLIST_SUCCESS = "ADD_TO_WATCHLIST_SUCCESS";
export const ADD_TO_WATCHLIST_FAIL = "ADD_TO_WATCHLIST_FAIL";
export const REMOVE_FROM_WATCHLIST_SUCCESS = "REMOVE_FROM_WATCHLIST_SUCCESS";
export const REMOVE_FROM_WATCHLIST_FAIL = "REMOVE_FROM_WATCHLIST_FAIL";
export const GET_WATCHLIST_SUCCESS = "GET_WATCHLIST_SUCCESS";
export const GET_WATCHLIST_FAIL = "GET_WATCHLIST_FAIL";
export const ADD_TO_WATCHLIST_REQUEST = "ADD_TO_WATCHLIST_REQUEST";
export const REMOVE_FROM_WATCHLIST_REQUEST = "REMOVE_FROM_WATCHLIST_REQUEST";
export const GET_WATCHLIST_REQUEST = "GET_WATCHLIST_REQUEST";

export const addToWatchlist = (userId, movieId, navigate) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_WATCHLIST_REQUEST });
    const res = await axios.post(
      `/api/watchlist/add/${userId}/${movieId}`,
      { withCredentials: true }
    );
    dispatch({ type: ADD_TO_WATCHLIST_SUCCESS, payload: res.data });
    toast.success("Successfully added")
  } catch (error) {
    const errorMessage = error?.response?.data?.error || error.message;
    toast.error(errorMessage);
    setTimeout(() => {
      dispatch({ type: ADD_TO_WATCHLIST_FAIL, payload: errorMessage });
      if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
  }
};

export const removeFromWatchlist = (userId, movieId, navigate) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_WATCHLIST_REQUEST });
    const res = await axios.delete(
      `/api/watchlist/remove/${userId}/${movieId}`,
      { withCredentials: true }
    );
    dispatch({ type: REMOVE_FROM_WATCHLIST_SUCCESS, payload: movieId });
    toast.success("Successfully removed");
  } catch (error) {
    const errorMessage = error?.response?.data?.error || error.message;
    toast.error(errorMessage);
    setTimeout(() => {
      dispatch({ type: REMOVE_FROM_WATCHLIST_FAIL, payload: errorMessage });
      if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
  }
};

export const fetchWatchlist = (userId, navigate) => async (dispatch) => {
  try {
    dispatch({ type: GET_WATCHLIST_REQUEST });
    const res = await axios.get(
      `/api/watchlist/${userId}`,
      { withCredentials: true }
    );
    dispatch({ type: GET_WATCHLIST_SUCCESS, payload: res.data });
  } catch (error) {
    const errorMessage = error?.response?.data?.error || error.message;
    toast.error(errorMessage);
    setTimeout(() => {
      dispatch({ type: GET_WATCHLIST_FAIL, payload: errorMessage });
      if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
  }
};
