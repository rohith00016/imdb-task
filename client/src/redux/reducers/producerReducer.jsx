const initialState = {
  producers: [],
  producer: null,  // Add this line to store a single producer
  loading: false,
  error: null
};

const producerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCERS_REQUEST':
    case 'FETCH_PRODUCER_BY_ID_REQUEST':  // Add this case to handle fetching a producer by ID
    case 'ADD_PRODUCER_REQUEST':
    case 'UPDATE_PRODUCER_REQUEST':
    case 'DELETE_PRODUCER_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_PRODUCERS_SUCCESS':
      return { ...state, loading: false, producers: action.payload, error: null };

    case 'FETCH_PRODUCER_BY_ID_SUCCESS':  // Add this case to handle the successful fetching of a producer by ID
      return { ...state, loading: false, producer: action.payload, error: null };

    case 'ADD_PRODUCER_SUCCESS':
      return { ...state, loading: false, producers: [...state.producers, action.payload], error: null };

    case 'UPDATE_PRODUCER_SUCCESS':
      return {
        ...state,
        loading: false,
        producers: state.producers.map(producer =>
          producer._id === action.payload._id ? action.payload : producer
        ),
        error: null
      };

    case 'DELETE_PRODUCER_SUCCESS':
      return {
        ...state,
        loading: false,
        producers: state.producers.filter(producer => producer._id !== action.payload),
        error: null
      };

    case 'FETCH_PRODUCERS_FAILURE':
    case 'FETCH_PRODUCER_BY_ID_FAILURE':  // Add this case to handle failures when fetching a producer by ID
    case 'ADD_PRODUCER_FAILURE':
    case 'UPDATE_PRODUCER_FAILURE':
    case 'DELETE_PRODUCER_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default producerReducer;
