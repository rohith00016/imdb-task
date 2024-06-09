const initialState = {
   actors: [],
   loading: false,
   error: null,
   actor: null // New state to hold a single actor
 };
 
 const actorReducer = (state = initialState, action) => {
   switch (action.type) {
     case "FETCH_ACTORS_REQUEST":
     case "ADD_ACTOR_REQUEST":
     case "UPDATE_ACTOR_REQUEST":
     case "DELETE_ACTOR_REQUEST":
       return { ...state, loading: true, error: null };
     case "FETCH_ACTORS_SUCCESS":
       return { ...state, loading: false, actors: action.payload, error: null };
     case "ADD_ACTOR_SUCCESS":
       return {
         ...state,
         loading: false,
         actors: [...state.actors, action.payload],
         error: null,
       };
     case "UPDATE_ACTOR_SUCCESS":
       const updatedActors = state.actors.map((actor) =>
         actor._id === action.payload._id ? action.payload : actor
       );
       return { ...state, loading: false, actors: updatedActors,error: null };
     case "DELETE_ACTOR_SUCCESS":
       const filteredActors = state.actors.filter(
         (actor) => actor._id !== action.payload
       );
       return { ...state, loading: false, actors: filteredActors, error: null };
     case "FETCH_ACTORS_FAILURE":
     case "ADD_ACTOR_FAILURE":
     case "UPDATE_ACTOR_FAILURE":
     case "DELETE_ACTOR_FAILURE":
       return { ...state, loading: false, error: action.payload };
     case "FETCH_ACTOR_BY_ID_REQUEST":
       return { ...state, loading: true, error: null, actor: null };
     case "FETCH_ACTOR_BY_ID_SUCCESS":
       return { ...state, loading: false, actor: action.payload, error: null };
     case "FETCH_ACTOR_BY_ID_FAILURE":
       return { ...state, loading: false, error: action.payload, actor: null };
     default:
       return state;
   }
 };
 
 export default actorReducer;
 