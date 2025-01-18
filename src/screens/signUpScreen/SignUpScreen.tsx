import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {signup} from '../../redux/slices/authSlice';
import useSignUp from '../../hooks/useSignup';
import CustomInput from '../../components/input/customInput';
import TermsCheckbox from '../../components/termCheckBox/TermCheckBox';
import LoginButton from '../../components/button/CustomButton';
import COLOR from '../../constant/constant';

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  App: any;
  Main: undefined;
};
type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;
interface Props {
  navigation: SignUpScreenNavigationProp;
}
const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleRegister,
    showError,
    emailError,
  } = useSignUp();
  const dispatch = useDispatch<AppDispatch>();
  const {isAuthenticated, error} = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('App');
    }
  }, [isAuthenticated, navigation]);

  const handleSignUp = async () => {
    const userData = await handleRegister();

    if (userData) {
      dispatch(signup(userData));
    } else {
      Alert.alert('Please fill in all fields correctly.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.form}>
          <View style={styles.maininputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <CustomInput
                type="text"
                placeholder=""
                value={name}
                onChange={text => setName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <CustomInput
                type="email"
                placeholder=""
                value={email}
                onChange={text => setEmail(text)}
              />
              {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            </View>
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
          <View style={styles.termsContainer}>
            <TermsCheckbox checked={false} onChange={() => {}} />
          </View>
          <View style={styles.buttonGroupContainer}>
            <LoginButton
              onClick={handleSignUp}
              title={loading ? 'Loading...' : 'Sign Up'}
              backgroundColor={COLOR.primary}
              textColor={COLOR.white}
              width={185}
            />
            {loading && (
              <ActivityIndicator
                size="large"
                color={COLOR.primary}
                style={styles.loader}
              />
            )}

            {showError && <Text style={styles.errorText}>{error}</Text>}

            <LoginButton
              onClick={() => navigation.navigate('Login')}
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
    fontWeight: '600',
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  buttonGroupContainer: {
    width: '100%',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'MontserratRegular',
  },
});

export default SignUpScreen;
