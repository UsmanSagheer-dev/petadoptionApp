import {useState} from 'react';
import {useAppDispatch} from '../hooks/hooks';
import {updatePassword, signout} from '../redux/slices/authSlice';
import {PasswordUpdateNavigationProp, PasswordUpdateState} from '../types/types';
import Toast from 'react-native-toast-message';

export const usePasswordUpdate = (navigation: PasswordUpdateNavigationProp) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<PasswordUpdateState>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    isLoading: false,
  });

  const validatePasswords = (): boolean => {
    if (!state.oldPassword || !state.newPassword || !state.confirmNewPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all password fields',
      });
      return false;
    }
    if (state.newPassword !== state.confirmNewPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'New passwords do not match',
      });
      return false;
    }
    if (state.newPassword.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'New password must be at least 6 characters',
      });
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async (): Promise<void> => {
    if (!validatePasswords()) return;

    setState(prev => ({...prev, isLoading: true}));
    try {
      await dispatch(
        updatePassword({
          oldPassword: state.oldPassword,
          newPassword: state.newPassword,
        }),
      ).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password updated successfully',
      });

      setState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        isLoading: false,
      });

      navigation.goBack();
    } catch (error: any) {
      const errorMessage = error.toString();
      if (errorMessage.includes('login again')) {
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: 'Please login again to update your password',
        });

        await dispatch(signout());
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
        });
      }
    } finally {
      setState(prev => ({...prev, isLoading: false}));
    }
  };

  return {state, setState, handleUpdateProfile};
};
