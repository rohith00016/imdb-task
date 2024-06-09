import {
   ADD_TO_WATCHLIST_SUCCESS,
   ADD_TO_WATCHLIST_FAIL,
   REMOVE_FROM_WATCHLIST_SUCCESS,
   REMOVE_FROM_WATCHLIST_FAIL,
   GET_WATCHLIST_SUCCESS,
   GET_WATCHLIST_FAIL,
   ADD_TO_WATCHLIST_REQUEST,
   REMOVE_FROM_WATCHLIST_REQUEST,
   GET_WATCHLIST_REQUEST
 } from '../actions/watchListActions';
 
 const initialState = {
   watchlist: [],
   loading: false,
   error: null
 };
 
 const watchlistReducer = (state = initialState, action) => {
   switch (action.type) {
     case ADD_TO_WATCHLIST_REQUEST:
     case REMOVE_FROM_WATCHLIST_REQUEST:
     case GET_WATCHLIST_REQUEST:
       return {
         ...state,
         loading: true,
         error: null
       };
     case ADD_TO_WATCHLIST_SUCCESS:
       return {
         ...state,
         watchlist: [...state.watchlist, action.payload.movie],
         loading: false,
         error: null
       };
     case ADD_TO_WATCHLIST_FAIL:
       return {
         ...state,
         loading: false,
         error: action.payload
       };
     case REMOVE_FROM_WATCHLIST_SUCCESS:
       return {
         ...state,
         watchlist: state.watchlist.filter(movie => movie._id !== action.payload),
         loading: false,
         error: null
       };
     case REMOVE_FROM_WATCHLIST_FAIL:
       return {
         ...state,
         loading: false,
         error: action.payload
       };
     case GET_WATCHLIST_SUCCESS:
       return {
         ...state,
         watchlist: action.payload.watchlist,
         loading: false,
         error: null
       };
     case GET_WATCHLIST_FAIL:
       return {
         ...state,
         loading: false,
         error: action.payload
       };
     default:
       return state;
   }
 };
 
 export default watchlistReducer;
 