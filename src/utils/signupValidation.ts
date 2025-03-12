import {validateEmail} from './emailUtils';
import Toast from 'react-native-toast-message';
import {ValidationRule, SignUpData} from '../types/types';

export const validateSignUp = (
  data: SignUpData,
  setShowError: (value: boolean) => void,
  setEmailError: (value: string | null) => void,
): boolean => {
  const validations: ValidationRule[] = [
    {
      condition: !data.name || !data.email || !data.password,
      message: 'All fields are required',
    },
    {
      condition: !validateEmail(data.email),
      message: 'Invalid email format',
    },
    {
      condition: data.password.length < 6,
      message: 'Password must be at least 6 characters',
    },
    {
      condition: !data.termsAccepted,
      message: 'Please accept the terms and conditions',
    },
  ];

  for (const {condition, message} of validations) {
    if (condition) {
      setShowError(true);
      setEmailError(message);
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: message,
      });
      return false;
    }
  }

  return true;
};
