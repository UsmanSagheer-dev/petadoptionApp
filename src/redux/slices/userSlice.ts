import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../types/auth';

// Fetch Logged-in User Details
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('No user is currently logged in.');
      }
      
      const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
      if (!userDoc.exists) {
        throw new Error('User data not found.');
      }
      
      return {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || userDoc.data()?.name,
        photoURL: currentUser.photoURL || null,
        ...userDoc.data(),
      } as User;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null as User | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
