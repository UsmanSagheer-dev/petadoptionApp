import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FavoriteState} from '../../types/types'
const initialState: FavoriteState = {
  favorites: [],
};
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      const snapshot = await firestore()
        .collection('userFavorites')
        .doc(user.uid)
        .collection('favoritePets')
        .get();

      const favorites = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return favorites;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const toggleFavoriteStatus = createAsyncThunk(
  'favorites/toggleFavoriteStatus',
  async (pet: any, { rejectWithValue, dispatch }) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const petId = pet.id;
      const newFavoriteStatus = !pet.isFavorite;

      const favRef = firestore()
        .collection('userFavorites')
        .doc(user.uid)
        .collection('favoritePets')
        .doc(petId);

      const petData = { ...pet, isFavorite: newFavoriteStatus };
      delete petData.createdAt;

      if (newFavoriteStatus) {
        await favRef.set(petData);
        dispatch(addFavorite(petData));
      } else {
        await favRef.delete();
        dispatch(removeFavorite(petId));
      }

      return { id: petId, isFavorite: newFavoriteStatus };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.favorites = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
