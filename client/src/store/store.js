import { configureStore } from '@reduxjs/toolkit';
import firebaseSliceReducer from './firebase.slice';

const store = configureStore({
  reducer: {
    firebase: firebaseSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;