import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

interface ProfileState {
  loading: boolean;
  error: string | null;
  profileData: {
    name: string;
    email: string;
    imageUrl: string | null;
  } | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  profileData: null
};

// Fetch profile data
export const fetchProfile = createAsyncThunk<ProfileState['profileData'], string, { rejectValue: string }>(
  'profile/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const profileDoc = await firestore()
        .collection('profiles')
        .where('userId', '==', userId)
        .orderBy('updatedAt', 'desc')
        .limit(1)
        .get();

      if (!profileDoc.empty) {
        const data = profileDoc.docs[0].data();
        return {
          name: data.name,
          email: data.email,
          imageUrl: data.imageUrl,
        };
      }
      return null;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Update profile data
export const updateProfile = createAsyncThunk<ProfileState['profileData'], { userId: string, name: string, email: string, imageUrl: string }, { rejectValue: string }>(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      await firestore()
        .collection('profiles')
        .add({
          ...profileData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      return {
        name: profileData.name,
        email: profileData.email,
        imageUrl: profileData.imageUrl,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

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
      // Fetch Profile Cases
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
      // Update Profile Cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;
