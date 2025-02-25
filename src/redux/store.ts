import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import donateReducer from './slices/donateSlice';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileImageSlice'
import favoritesReducer from './slices/favoritesSlice'
import adoptionRequestsReducer from "./slices/adoptionRequestsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    donation: donateReducer,
    user: userReducer,
    profile:profileReducer,
    favorites: favoritesReducer,
    adoptionRequests: adoptionRequestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;