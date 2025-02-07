import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


import {User, AuthState, SignupPayload, SigninPayload} from '../../types/auth';

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
  showSplash: true, 
user: null
};
export const googleSignup = createAsyncThunk(
  'auth/googleSignup',
  async (userInfo: { idToken: string; name: string; email: string }, { rejectWithValue }) => {
    try {
      const { idToken, name, email } = userInfo;

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const newUser = userCredential.user;

      if (!newUser) {
        throw new Error('Google Sign-Up failed.');
      }

      await firestore().collection('users').doc(newUser.uid).set({
        id: newUser.uid,
        name,
        email,
        createdAt: firestore.Timestamp.now(),
      });

      return {
        uid: newUser.uid,
        email: newUser.email,
        displayName: newUser.displayName || name,
        photoURL: newUser.photoURL || null,
      } as User;
    } catch (error: any) {
      return rejectWithValue(error.code || error.message);
    }
  }
);


// Signup
export const signup = createAsyncThunk(
  'auth/signup',
  async ({email, password, name}: SignupPayload, {rejectWithValue}) => {
    try {
      const existingUser = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
      if (!existingUser.empty) {
        return rejectWithValue('This email is already registered.');
      }

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      if (!user) throw new Error('User creation failed.');

      await user.updateProfile({displayName: name});

      await firestore().collection('users').doc(user.uid).set({
        id: user.uid,
        name,
        email,
        createdAt: firestore.Timestamp.now(),
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || name,
        photoURL: user.photoURL || null,
      } as User;
    } catch (error: any) {
      return rejectWithValue(error.code || error.message);
    }
  },
);

// Signin
export const signin = createAsyncThunk(
  'auth/signin',
  async ({email, password}: SigninPayload, {rejectWithValue}) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      if (!user) throw new Error('Login failed.');

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      } as User;
    } catch (error: any) {
      return rejectWithValue(error.code || error.message);
    }
  },
);

// Signout
export const signout = createAsyncThunk(
  'auth/signout',
  async (_, {rejectWithValue}) => {
    try {
      await auth().signOut();
    } catch (error: any) {
      return rejectWithValue(error.code || error.message);
    }
  },
);

// Update Password
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

      await firestore().collection('users').doc(user.uid).update({
        password: newPassword,
      });

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder

    .addCase(googleSignup.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(googleSignup.rejected, (state, action) => {
      state.error = action.payload as string;
    })
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
      .addCase(signout.fulfilled, state => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updatePassword.fulfilled, state => {
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;
