import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {User} from '../../types/types';
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

      const userDoc = firestore()
        .collection('users')
        .doc(userCredential.user.uid);
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
  },
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
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (
    {oldPassword, newPassword}: {oldPassword: string; newPassword: string},
    {rejectWithValue},
  ) => {
    try {
      const user = auth().currentUser;
      if (!user || !user.email) {
        throw new Error('User not found. Please login again.');
      }
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        oldPassword,
      );
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
      return 'Password updated successfully';
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        return rejectWithValue('Incorrect old password.');
      } else if (error.code === 'auth/requires-recent-login') {
        return rejectWithValue('Session expired, please login again.');
      } else {
        return rejectWithValue(error.message);
      }
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
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.initializing = false;
    },
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.initializing = action.payload;
    },
    setShowSplash: (state, action: PayloadAction<boolean>) => {
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
