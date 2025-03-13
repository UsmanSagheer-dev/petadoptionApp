import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomInput from '../../components/input/customInput';
import TermsCheckbox from '../../components/termCheckBox/TermCheckBox';
import COLOR from '../../constants/constant';
import useLogin from '../../hooks/useLogin';
import styles from './style';
import CustomButton from '../../components/customButton/CustomButton';
import { LoginScreenProps } from 'types';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
    termsAccepted,
    setTermsAccepted,
    termsError,
  } = useLogin(navigation);

  // Show error toast when error exists
  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (termsError) {
      Toast.show({
        type: 'error',
        text1: 'Terms Required',
        text2: termsError,
      });
    }
  }, [termsError]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <View style={styles.maininputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <CustomInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <CustomInput
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('Recover')}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <TermsCheckbox checked={termsAccepted} onChange={setTermsAccepted} />
          </View>

          <View style={styles.buttonGroupContainer}>
            <CustomButton
              onClick={handleLogin}
              title={loading ? 'Loading...' : 'Login'}
              backgroundColor={COLOR.primary}
              textColor={COLOR.white}
              width={185}
              disabled={!termsAccepted || loading}
            />
            <CustomButton
              onClick={() => navigation.navigate('SignUp')}
              title="Sign Up"
              backgroundColor={COLOR.white}
              textColor={COLOR.primary}
              width={'100%'}
            />
          </View>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
