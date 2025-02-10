import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { PetDonation } from '../../types/auth';
import { serverTimestamp } from "firebase/firestore";

// Initial state ka type
interface DonationState {
  loading: boolean;
  error: string | null;
  donations: PetDonation[];
}

// **Pet donate karne ka function** (Already added)
export const donatePet = createAsyncThunk<PetDonation, PetDonation>(
  'donation/donatePet',
  async (petData, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      const userDonationsRef = firestore()
        .collection('donations')
        .doc(user.uid)
        .collection('usersDonations');

      const docRef = await userDonationsRef.add({
        userId: user.uid,
        isFavorite: false,
        ...petData,
        createdAt: serverTimestamp(),
      });

      return { id: docRef.id, ...petData };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// **Firestore se saara donation data fetch karna** (NEW FUNCTION)
export const fetchDonations = createAsyncThunk<PetDonation[], void>(
  'donation/fetchDonations',
  async (_, { rejectWithValue }) => {
    try {
      const donationsRef = firestore().collectionGroup('usersDonations');
      const snapshot = await donationsRef.get();

      const donations: PetDonation[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PetDonation[];

      return donations;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Redux slice ka **initial state**
const initialState: DonationState = {
  loading: false,
  error: null,
  donations: [],
};

// **Redux Slice**
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
      })

      // **Fetch Donations Cases (NEW)**
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action: PayloadAction<PetDonation[]>) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default donateSlice.reducer;
