import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, firestore } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';


interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}


interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
};


export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, name }: { email: string; password: string; name: string }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      const userDoc = {
        id: userCredential.user.uid,
        name: name || 'Anonymous',
        email,
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(collection(firestore, 'users'), userCredential.user.uid), userDoc);

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || name || '',
        photoURL: userCredential.user.photoURL || null,
      } as User;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const signin = createAsyncThunk(
  'auth/signin',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      } as User;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing out
export const signout = createAsyncThunk('auth/signout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signout.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
