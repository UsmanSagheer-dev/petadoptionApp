import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { FirebaseError } from 'firebase/app';

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
