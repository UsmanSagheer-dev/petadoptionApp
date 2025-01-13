import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator, // Import the ActivityIndicator for loading
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomInput from '../../components/input/customInput';
import TermsCheckbox from '../../components/termCheckBox/TermCheckBox';
import LoginButton from '../../components/button/CustomButton';
import COLOR from '../../constant/constant';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/slices/authSlice'; // Import the signup action
import { AppDispatch } from '../../redux/store'; // Import AppDispatch

// Defining types for the navigation params
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
  // State with explicit types
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); // To show if email already exists
  const [loading, setLoading] = useState(false); // State to handle loading
  const dispatch = useDispatch<AppDispatch>();
  const { error, isAuthenticated } = useSelector((state: any) => state.auth);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid email format.');
      return;
    }

    try {
      setLoading(true); // Show loader when the signup starts
      // Dispatch signup action
      await dispatch(signup({ email, password, name }));
      console.log('User registered successfully');
    } catch (err: any) {
      console.error('Registration failed:', err.message);
      if (err.message.includes('email-already-in-use')) {
        setShowError(true);
      } else {
        Alert.alert('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false); // Hide loader once the process is complete
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("🚀 ~ useEffect ~ isAuthenticated:", isAuthenticated)
      navigation.navigate('Home');
    }
  }, [isAuthenticated, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.form}>
          <View style={styles.maininputContainer}>
            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <CustomInput
                type="text"
                placeholder=""
                value={name}
                onChange={text => setName(text)}
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
              onClick={handleRegister} // Dispatch the signup action on button click
              title="Sign Up"
              backgroundColor={COLOR.primary}
              textColor={COLOR.white}
              width={185}
            />

            {/* Loader - Show when loading is true */}
            {loading && (
              <ActivityIndicator size="large" color={COLOR.primary} style={styles.loader} />
            )}

            {/* Display error message when an error occurs during signup */}
            {showError && (
              <Text style={styles.errorText}>{error}</Text>
            )}

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
  loader: {
    marginTop: 20, // Add some space between the button and the loader
  },
  errorText: {
    color: COLOR.white,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
  },
});

export default SignUpScreen;
