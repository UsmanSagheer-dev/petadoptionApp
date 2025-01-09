import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomInput from '../../components/input/customInput';
import TermsCheckbox from '../../components/termCheckBox/TermCheckBox';
import LoginButton from '../../components/button/CustomButton';
import COLOR from '../../constant/constant';

// Define the navigation prop types
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Recover: undefined; // Add Recover screen to the navigation types
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.maininputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <CustomInput
                type="email"
                placeholder=""
                value={email}
                onChange={text => setEmail(text)}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <CustomInput
                type="password"
                placeholder=""
                value={password}
                onChange={text => setPassword(text)}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('Recover')} // Ensure 'Recover' screen is defined in the navigator
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TermsCheckbox checked={false} onChange={() => {}} />
          </View>

          <View style={styles.buttonGroupContainer}>
            <LoginButton
              onClick={() => navigation.navigate('Home')} // Navigate to Home screen on login
              title="Login"
              backgroundColor={COLOR.primary}
              textColor={COLOR.white}
              width={185}
            />
            {/* Sign Up Link */}
            <LoginButton
              onClick={() => navigation.navigate('SignUp')} // Navigate to SignUp screen
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    paddingHorizontal: 27,
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 24,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  form: {
    marginTop: 49,
  },
  termsContainer: {
    marginTop: 14,
  },
  maininputContainer: {
    width: '100%',
    gap: 22,
  },
  inputContainer: {},
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 600,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
    fontWeight: 600,
  },
  signUpContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: COLOR.info,
  },
  buttonGroupContainer: {
    width: '100%',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
