// authSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  initializing: boolean;
  showSplash: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  initializing: true,
  showSplash: true,
  error: null,
};

export const googleSignup = createAsyncThunk(
  'auth/googleSignup',
  async (userInfo: {idToken: string}, {rejectWithValue}) => {
    try {
      const {idToken} = userInfo;
      const credential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(credential);
      
      if (!userCredential.user) {
        throw new Error('Google authentication failed');
      }

      const userDoc = firestore().collection('users').doc(userCredential.user.uid);
      const docSnapshot = await userDoc.get();

      if (!docSnapshot.exists) {
        await userDoc.set({
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    {email, password, name}: {email: string; password: string; name: string},
    {rejectWithValue},
  ) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      
      if (!userCredential.user) {
        throw new Error('User creation failed');
      }

      await userCredential.user.updateProfile({displayName: name});
      await firestore().collection('users').doc(userCredential.user.uid).set({
        uid: userCredential.user.uid,
        displayName: name,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signout = createAsyncThunk(
  'auth/signout',
  async (_, {rejectWithValue}) => {
    try {
      await auth().signOut();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
        ? {
            uid: action.payload.uid,
            email: action.payload.email,
            displayName: action.payload.displayName,
            photoURL: action.payload.photoURL,
          }
        : null;
      state.initializing = false;
    },
    setInitializing: (state, action) => {
      state.initializing = action.payload;
    },
    setShowSplash: (state, action) => {
      state.showSplash = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(googleSignup.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signin.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signout.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {setUser, setInitializing, setShowSplash, clearError} =
  authSlice.actions;
export default authSlice.reducer;