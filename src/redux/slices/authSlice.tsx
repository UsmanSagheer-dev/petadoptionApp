// authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
      // Check if email already exists in Firestore
      const existingUser = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      if (!existingUser.empty) {
        throw new Error('This email is already registered. Please try another email.');
      }

      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      if (name) {
        await userCredential.user.updateProfile({
          displayName: name,
        });
      }

      const userDoc = {
        id: userCredential.user.uid,
        name: name || 'Anonymous',
        email,
        password,
        createdAt: firestore.Timestamp.now(),
      };

      await firestore().collection('users').doc(userCredential.user.uid).set(userDoc);

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
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
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

export const signout = createAsyncThunk(
  'auth/signout', 
  async (_, { rejectWithValue }) => {
    try {
      await auth().signOut();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

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

// store.ts remains the same
