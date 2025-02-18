import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updatePassword, signout} from '../redux/slices/authSlice';
import {AppDispatch} from '../redux/store';
import {Alert} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type PasswordUpdateNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PasswordUpdate'
>;

export interface PasswordUpdateState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  isLoading: boolean;
}

export const usePasswordUpdate = (navigation: PasswordUpdateNavigationProp) => {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState<PasswordUpdateState>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    isLoading: false,
  });

  const validatePasswords = (): boolean => {
    if (!state.oldPassword || !state.newPassword || !state.confirmNewPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return false;
    }
    if (state.newPassword !== state.confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return false;
    }
    if (state.newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
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
      Alert.alert('Success', 'Password updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            setState({
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: '',
              isLoading: false,
            });
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      const errorMessage = error.toString();
      if (errorMessage.includes('login again')) {
        Alert.alert(
          'Session Expired',
          'Please login again to update your password',
          [
            {
              text: 'OK',
              onPress: async () => {
                await dispatch(signout());
                navigation.navigate('Login' as keyof RootStackParamList);
              },
            },
          ],
        );
      } else {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setState(prev => ({...prev, isLoading: false}));
    }
  };

  return {state, setState, handleUpdateProfile};
};
