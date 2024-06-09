import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import actorReducer from './reducers/actorReducer';
import producerReducer from './reducers/producerReducer';
import movieReducer from './reducers/movieReducer';
import watchlistReducer from './reducers/watchListReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    actors:actorReducer,
    producers:producerReducer,
    movies:movieReducer,
    users:watchlistReducer,
  },
});

export default store;
