import axios from 'axios';
import toast from 'react-hot-toast';

export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post('/api/login', userData,{ withCredentials: true });
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    toast.success("Login success")
    setTimeout(() => {
      navigate("/watchlist");
    }, 1000);
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
    const errorMessage = error?.response?.data?.error || error;
    toast.error(errorMessage)
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  try {
    await axios.post('/api/logout',{ withCredentials: true });
    dispatch({ type: 'LOGOUT_SUCCESS' });
    toast.success("Logout success")
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } catch (error) {
    console.log('Logout error:', error);
    const errorMessage = error?.response?.data?.error || error;
    toast.error(errorMessage)

  }
};

export const signupUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post('/api/signup', userData, { withCredentials: true });
    dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
    toast.success("success")
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAIL', payload: error.response.data.message });
    const errorMessage = error?.response?.data?.error || error;
    toast.error(errorMessage)
  }
};
