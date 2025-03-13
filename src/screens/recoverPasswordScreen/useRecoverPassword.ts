import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const useRecoverPassword = () => {
  const [email, setEmail] = useState<string>('');

  const handleRecover = async (): Promise<void> => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your email',
      });
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password reset email sent!',
      });
      setEmail('');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Unable to send reset email',
      });
    }
  };

  return {
    email,
    setEmail,
    handleRecover,
  };
};

export default useRecoverPassword;