import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import  donateReducer  from './slices/donateSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    donation: donateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
