import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { AdoptionRequest, Pet } from '../../types/types'; // Updated import with correct capitalized types
import { updatePetDonationsProfile } from './authSlice';

interface PetState {
  loading: boolean;
  error: string | null;
  donations: Pet[];
  favorites: Pet[];
}

const initialState: PetState = {
  loading: false,
  error: null,
  donations: [],
  favorites: [],
};

export const donatePet = createAsyncThunk<
  Pet,
  Omit<Pet, 'id' | 'userId' | 'requests' | 'createdAt'>,
  { rejectValue: string }
>('pet/donatePet', async (petData, { rejectWithValue }) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = firestore().collection('pets').doc();
    const timestamp = firestore.Timestamp.now();

    const userDoc = await firestore().collection('users').doc(user.uid).get();
    const userProfile = userDoc.data();
    const donationData: Pet = {
      ...petData,
      id: docRef.id,
      userId: user.uid,
      requests: [],
      createdAt: timestamp,
      ownerDisplayName: userProfile?.displayName || user.displayName || '',
      ownerEmail: userProfile?.email || user.email || '',
      ownerPhotoURL: userProfile?.photoURL || user.photoURL || '',
    };

    await docRef.set(donationData);
    return donationData;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const toggleFavoriteStatus = createAsyncThunk<
  { pet: Pet; isFavorite: boolean },
  Pet,
  { rejectValue: string }
>('pet/toggleFavoriteStatus', async (pet, { rejectWithValue }) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const petId = pet.id;
    const newFavoriteStatus = !pet.isFavorite;

    const favRef = firestore()
      .collection('pets')
      .doc(user.uid)
      .collection('favoritePets')
      .doc(petId);

    const petData: Pet = {
      ...pet,
      isFavorite: newFavoriteStatus,
      createdAt:
        pet.createdAt instanceof firestore.Timestamp
          ? pet.createdAt
          : firestore.Timestamp.fromDate(new Date(pet.createdAt)),
    };

    if (newFavoriteStatus) {
      await favRef.set({
        ...petData,
        favoritedAt: firestore.Timestamp.now(),
      });
    } else {
      await favRef.delete();
    }

    return { pet: petData, isFavorite: newFavoriteStatus };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchFavorites = createAsyncThunk<
  Pet[],
  void,
  { rejectValue: string }
>('pet/fetchFavorites', async (_, { rejectWithValue }) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const snapshot = await firestore()
      .collection('userFavorites')
      .doc(user.uid)
      .collection('favoritePets')
      .get();

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      isFavorite: true,
      createdAt:
        doc.data().createdAt instanceof firestore.Timestamp
          ? doc.data().createdAt
          : firestore.Timestamp.fromDate(new Date(doc.data().createdAt)),
    })) as Pet[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchDonations = createAsyncThunk<
  Pet[],
  void,
  { rejectValue: string }
>('pet/fetchDonations', async (_, { rejectWithValue }) => {
  try {
    const snapshot = await firestore()
      .collection('pets')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        requests: data.requests || [],
        createdAt: data.createdAt as FirebaseFirestoreTypes.Timestamp,
      } as Pet;
    });
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const requestAdoption = createAsyncThunk<
  { donationId: string; requestData: AdoptionRequest },
  { donationId: string; userData: { uid: string; name: string; email: string } },
  { rejectValue: string }
>('pet/requestAdoption', async ({ donationId, userData }, { rejectWithValue }) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');
    const petRef = firestore().collection('pets').doc(donationId);

    const requestData: AdoptionRequest = {
      userId: userData.uid,
      userName: userData.name,
      userEmail: userData.email,
      timestamp: firestore.Timestamp.now().toDate().toISOString(),
      petId: donationId, // Added petId as it's required by AdoptionRequest interface
      status: 'pending', // Added status as it's required by AdoptionRequest interface
      createdAt: firestore.Timestamp.now(), // Added createdAt as it's required
    };

    await petRef.update({
      requests: firestore.FieldValue.arrayUnion(requestData),
    });

    return { donationId, requestData };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteDonation = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('pet/deleteDonation', async (donationId, { rejectWithValue }) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    await firestore().collection('pets').doc(donationId).delete();
    return donationId;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    clearPetError: state => {
      state.error = null;
    },
    resetPetState: state => {
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
      .addCase(donatePet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.loading = false;
        state.donations.unshift(action.payload);
      })
      .addCase(donatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Pet[]>) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(toggleFavoriteStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { pet, isFavorite } = action.payload;

        if (isFavorite) {
          if (!state.favorites.some(f => f.id === pet.id)) {
            state.favorites.push(pet);
          }
        } else {
          console.log(`Removing pet ${pet.id} from favorites`);
          state.favorites = state.favorites.filter(f => f.id !== pet.id);
        }

        state.donations = state.donations.map(d =>
          d.id === pet.id ? { ...d, isFavorite } : d,
        );
      })
      .addCase(toggleFavoriteStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchDonations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action: PayloadAction<Pet[]>) => {
        state.loading = false;
        state.donations = action.payload;
      })
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
        const { donationId, requestData } = action.payload;
        const donation = state.donations.find(d => d.id === donationId);
        if (donation) {
          if (!donation.requests) {
            donation.requests = [];
          }
          donation.requests.push({
            userId: requestData.userId,
            userName: requestData.userName,
            userEmail: requestData.userEmail,
            timestamp: requestData.timestamp,
            id: requestData.id,
            status: requestData.status,
          });
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
      })

      .addCase(updatePetDonationsProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePetDonationsProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = state.donations.map(donation => {
          if (donation.userId === auth().currentUser?.uid) {
            return {
              ...donation,
              ownerPhotoURL: action.payload.photoURL,
              ownerDisplayName: action.payload.displayName,
            };
          }
          return donation;
        });
      })
      .addCase(updatePetDonationsProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPetError, resetPetState } = petSlice.actions;
export default petSlice.reducer;