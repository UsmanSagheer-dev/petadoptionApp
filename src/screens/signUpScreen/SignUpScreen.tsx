import React, { useState } from 'react';
import {
  View,
  Text,
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
  SignUp: undefined;
  Login: undefined;
  Home: undefined;
};

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.form}>
          {/* Username Input */}
          <View style={styles.maininputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <CustomInput
                type="text"
                placeholder=""
                value={username}
                onChange={text => setUsername(text)}
              />
            </View>
            {/* Email Input */}
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
            </View>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TermsCheckbox checked={false} onChange={() => {}} />
          </View>

          <View style={styles.buttonGroupContainer}>
            {/* Sign Up Button */}
            <LoginButton
              onClick={() => navigation.navigate('Home')} // Navigate to Home screen after sign up
              title="Sign Up"
              backgroundColor={COLOR.primary}
              textColor={COLOR.white}
              width={185}
            />
            {/* Login Link */}
            <LoginButton
              onClick={() => navigation.navigate('Login')} // Navigate to Login screen
              title="Login"
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
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 27,
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
  buttonGroupContainer: {
    width: '100%',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
