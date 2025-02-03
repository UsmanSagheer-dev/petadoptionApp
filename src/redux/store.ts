import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import donateReducer from './slices/donateSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    donation: donateReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;