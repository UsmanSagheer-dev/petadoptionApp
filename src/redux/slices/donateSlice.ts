import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {adoptionRequest, PetDonation} from '../../types/types';
interface DonationState {
  loading: boolean;
  error: string | null;
  donations: PetDonation[];
}
const initialState: DonationState = {
  loading: false,
  error: null,
  donations: [],
};

export const donatePet = createAsyncThunk<
  PetDonation,
  Omit<PetDonation, 'id' | 'userId' | 'requests' | 'createdAt'>,
  {rejectValue: string}
>('donation/donatePet', async (petData, {rejectWithValue}) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = firestore().collection('donations').doc();

    const timestamp = firestore.Timestamp.now();

    const donationData: PetDonation = {
      ...petData,
      id: docRef.id,
      userId: user.uid,
      requests: [],
      createdAt: timestamp,
      ownerDisplayName: user.displayName || '',
      ownerEmail: user.email || '',
      ownerPhotoURL: user.photoURL || '',
    };

    await docRef.set(donationData);
    return donationData;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchDonations = createAsyncThunk<
  PetDonation[],
  void,
  {rejectValue: string}
>('donation/fetchDonations', async (_, {rejectWithValue}) => {
  try {
    const snapshot = await firestore()
      .collection('donations')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        requests: data.requests || [],
        createdAt: data.createdAt as FirebaseFirestoreTypes.Timestamp,
      } as PetDonation;
    });
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const requestAdoption = createAsyncThunk<
  {donationId: string; requestData: adoptionRequest},
  {donationId: string; userData: {uid: string; name: string; email: string}},
  {rejectValue: string}
>(
  'donation/requestAdoption',
  async ({donationId, userData}, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');
      const donationRef = firestore().collection('donations').doc(donationId);
      const requestData: adoptionRequest = {
        userId: userData.uid,
        userName: userData.name,
        userEmail: userData.email,
        timestamp: firestore.Timestamp.now().toDate().toISOString(),
      };

      await donationRef.update({
        requests: firestore.FieldValue.arrayUnion(requestData),
      });

      return {donationId, requestData};
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteDonation = createAsyncThunk<
  string,
  string,
  {rejectValue: string}
>('donation/deleteDonation', async (donationId, {rejectWithValue}) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    await firestore().collection('donations').doc(donationId).delete();
    return donationId;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const donateSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    clearDonationError: state => {
      state.error = null;
    },
    resetDonationState: state => {
      state.loading = false;
      state.error = null;
      state.donations = [];
    },
  },
  extraReducers: builder => {
    builder

      .addCase(donatePet.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        donatePet.fulfilled,
        (state, action: PayloadAction<PetDonation>) => {
          state.loading = false;
          state.donations.unshift(action.payload);
        },
      )
      .addCase(donatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchDonations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDonations.fulfilled,
        (state, action: PayloadAction<PetDonation[]>) => {
          state.loading = false;
          state.donations = action.payload;
        },
      )
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(requestAdoption.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestAdoption.fulfilled, (state, action) => {
        state.loading = false;
        const {donationId, requestData} = action.payload;
        const donation = state.donations.find(d => d.id === donationId);
        if (donation) {
          if (!donation.requests) {
            donation.requests = [];
          }
          donation.requests.push(requestData);
        }
      })
      .addCase(requestAdoption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteDonation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = state.donations.filter(
          donation => donation.id !== action.payload,
        );
      })
      .addCase(deleteDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearDonationError, resetDonationState} = donateSlice.actions;
export default donateSlice.reducer;
