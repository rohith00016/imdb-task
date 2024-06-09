const initialState = {
  authUser: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        authUser: action.payload,
        isLoading: false,
        error: null,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAIL':
    case 'SIGNUP_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT_SUCCESS':
      // Clear user data from localStorage
      localStorage.removeItem('user');
      return {
        ...state,
        authUser: null,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
