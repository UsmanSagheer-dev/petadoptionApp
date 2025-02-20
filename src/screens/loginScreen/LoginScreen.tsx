import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {LoginScreenNavigationProp} from '../../types/types';
import CustomInput from '../../components/input/customInput';
import TermsCheckbox from '../../components/termCheckBox/TermCheckBox';
import LoginButton from '../../components/button/CustomButton';
import COLOR from '../../constant/constant';
import useLogin from '../../hooks/useLogin';
import styles from './style';
interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                onPress={() => navigation.navigate('Recover')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.termsContainer}>
            <TermsCheckbox
              checked={termsAccepted}
              onChange={setTermsAccepted}
            />
            {termsError !== '' && (
              <Text style={styles.errorText}>{termsError}</Text>
            )}
          </View>

          <View style={styles.buttonGroupContainer}>
            <LoginButton
              onClick={handleLogin}
              title={loading ? 'Loading...' : 'Login'}
              backgroundColor={COLOR.primary}
              textColor={COLOR.white}
              width={185}
              disabled={!termsAccepted || loading}
            />
            <LoginButton
              onClick={() => navigation.navigate('SignUp')}
              title="Sign Up"
              backgroundColor={COLOR.white}
              textColor={COLOR.primary}
              width={'100%'}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
