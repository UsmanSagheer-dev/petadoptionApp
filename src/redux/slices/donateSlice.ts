import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { PetDonation } from '../../types/auth';

// Initial state ke liye type define karein
interface DonationState {
  loading: boolean;
  error: string | null;
  donations: PetDonation[];
}

// Firestore me data save karne ke liye async function
export const donatePet = createAsyncThunk<PetDonation, PetDonation>(
  'donation/donatePet',
  async (petData, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      // User's donations subcollection reference
      const userDonationsRef = firestore()
        .collection('donations')
        .doc(user.uid) // User document
        .collection('usersDonations'); // User's donations subcollection

      // Adding pet donation data to the user's donations subcollection
      const docRef = await userDonationsRef.add({
        userId: user.uid,
        isFavorite:false,
        ...petData,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Returning the new donation data
      return { id: docRef.id, ...petData };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);


// Redux slice ka initial state
const initialState: DonationState = {
  loading: false,
  error: null,
  donations: [],
};


const donateSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(donatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(donatePet.fulfilled, (state, action: PayloadAction<PetDonation>) => {
        state.loading = false;
        state.donations.push(action.payload);
      })
      .addCase(donatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default donateSlice.reducer;
