import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore, {serverTimestamp} from '@react-native-firebase/firestore';
import {User} from '../../types/types';
interface AuthState {
  user: User | null;
  profileData: any | null;
  initializing: boolean;
  showSplash: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  profileData: null,
  initializing: true,
  showSplash: true,
  loading: false,
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

      const profileData = docSnapshot.exists
        ? docSnapshot.data()
        : await userDoc.get().then(doc => doc.data());
      return {user: userCredential.user, profileData};
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
      const userDoc = firestore()
        .collection('users')
        .doc(userCredential.user.uid);
      await userDoc.set({
        uid: userCredential.user.uid,
        displayName: name,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      const profileData = await userDoc.get().then(doc => doc.data());
      return {user: userCredential.user, profileData};
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
      const userDoc = firestore()
        .collection('users')
        .doc(userCredential.user.uid);
      const profileData = await userDoc.get().then(doc => doc.data());
      return {user: userCredential.user, profileData};
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

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, {rejectWithValue}) => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      const doc = await firestore().collection('users').doc(userId).get();
      return doc.exists ? doc.data() : null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updatePetDonationsProfile = createAsyncThunk(
  'auth/updatePetDonationsProfile',
  async (
    {photoURL, displayName}: {photoURL: string; displayName: string},
    {rejectWithValue},
  ) => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');

      const petSnapshot = await firestore()
        .collection('pets')
        .where('userId', '==', userId)
        .get();

      const batch = firestore().batch();
      petSnapshot.docs.forEach(doc => {
        batch.update(doc.ref, {
          ownerPhotoURL: photoURL,
          ownerDisplayName: displayName,
          updatedAt: serverTimestamp(),
        });
      });

      await batch.commit();
      return {photoURL, displayName};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    {name, imageUrl}: {name: string; imageUrl: string},
    {dispatch, rejectWithValue},
  ) => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');

      await firestore().collection('users').doc(userId).set(
        {
          displayName: name,
          photoURL: imageUrl,
          updatedAt: serverTimestamp(),
        },
        {merge: true},
      );

      await auth().currentUser?.updateProfile({
        displayName: name,
        photoURL: imageUrl,
      });

      await dispatch(
        updatePetDonationsProfile({photoURL: imageUrl, displayName: name}),
      ).unwrap();

      return {displayName: name, photoURL: imageUrl};
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
    clearProfile: state => {
      state.profileData = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(googleSignup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profileData = action.payload.profileData;
      })
      .addCase(googleSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Signup
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profileData = action.payload.profileData;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profileData = action.payload.profileData;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Password
      .addCase(updatePassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, state => {
        state.loading = false;
        state.user = null;
        state.profileData = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePetDonationsProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePetDonationsProfile.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updatePetDonationsProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Profile
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profileData) {
          state.profileData = {...state.profileData, ...action.payload};
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setUser,
  setInitializing,
  setShowSplash,
  clearError,
  clearProfile,
} = authSlice.actions;
export default authSlice.reducer;
