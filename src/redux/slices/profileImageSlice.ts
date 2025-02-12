import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Types
interface ProfileData {
  name: string;
  email?: string;
  imageUrl: string | null;
  petBreed?: string;
  petType?: string;
  location?: string;
  dateJoined?: string;
}

interface ProfileState {
  loading: boolean;
  error: string | null;
  profileData: ProfileData | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  profileData: null
};

// Thunks
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');

      const doc = await firestore().collection('users').doc(userId).get();
      
      if (doc.exists) {
        return doc.data() as ProfileState['profileData'];
      }
      return null;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ name, imageUrl }: { name: string; imageUrl: string }, 
  { rejectWithValue }) => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');

      await firestore().collection('users').doc(userId).set({
        name,
        imageUrl,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      return { name, imageUrl };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profileData = null;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profileData) {
          state.profileData = { 
            ...state.profileData, 
            ...action.payload 
          };
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;