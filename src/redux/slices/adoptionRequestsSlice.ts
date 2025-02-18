import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

interface ProfileData {
  id?: string;
  name: string;
  email?: string;
  imageUrl: string | null;
  petBreed?: string;
  petType?: string;
  location?: string;
  dateJoined?: string;
}

interface ProfileState {
  profileData: ProfileData | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: ProfileState = {
  profileData: null,
  loading: false,
  error: null,
};

// ✅ **Thunk: Fetch User Profile from Firestore**
export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (userId: string, { rejectWithValue }) => {
      try {
        const doc = await firestore().collection("profiles").doc(userId).get();
  
        if (!doc.exists) {
          return rejectWithValue("Profile not found");
        }
  
        const data = doc.data();
        console.log("🚀 ~ data:", data)
        const dateJoined = data?.dateJoined?.toDate()?.toLocaleDateString(); // Convert Timestamp
  
        return { 
          id: doc.id, 
          ...data,
          dateJoined: dateJoined || "Date not available"
        } as ProfileData;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );

// ✅ **Profile Slice**
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
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
      });
  },
});

export default profileSlice.reducer;
