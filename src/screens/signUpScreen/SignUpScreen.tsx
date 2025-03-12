import React, {useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAppSelector} from '../../hooks/hooks';
import useSignUp from '../../hooks/useSignup';
import CustomInput from '../../components/input/customInput';
import TermsCheckbox from '../../components/termCheckBox/TermCheckBox';
import COLOR from '../../constants/constant';
import OrDivider from '../../components/onDivider/OnDivider';
import IMAGES from '../../assets/images/index';
import useGoogleSignIn from '../../hooks/useGoogleSignIn';
import styles from './style';
import {Props} from '../../types/types';
import {GOOGLE_WEB_CLIENT_ID} from '../../config/config';
import CustomButton from '../../components/customButton/CustomButton';

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    showError,
    emailError,
    termsAccepted,
    setTermsAccepted,
    handleSignUp,
  } = useSignUp(navigation);

  const {onGoogleButtonPress, isGoogleLoading} = useGoogleSignIn();
  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('App');
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
            <TermsCheckbox
              checked={termsAccepted}
              onChange={setTermsAccepted}
            />
          </View>
          <View style={styles.buttonGroupContainer}>
            <View style={styles.signupButtonContainer}>
              <CustomButton
                onClick={handleSignUp}
                title={loading ? 'Signing up...' : 'Sign Up'}
                backgroundColor={COLOR.primary}
                textColor={COLOR.white}
                width={185}
                disabled={!termsAccepted || loading}
              />
              {loading && (
                <ActivityIndicator
                  size="small"
                  color={COLOR.white}
                  style={styles.buttonLoader}
                />
              )}
            </View>
            {showError && <Text style={styles.errorText}>{showError}</Text>}
            <CustomButton
              onClick={() => navigation.navigate('Login')}
              title="Login"
              backgroundColor={COLOR.white}
              textColor={COLOR.primary}
              width={'100%'}
            />
          </View>
          <View>
            <OrDivider />
          </View>

          <TouchableOpacity
            style={styles.googlecontainer}
            onPress={onGoogleButtonPress}>
            <TouchableOpacity disabled={isGoogleLoading}>
              {isGoogleLoading ? (
                <ActivityIndicator size="small" color={COLOR.primary} />
              ) : (
                <Image source={IMAGES.GOOGLEIMG} style={styles.googleimg} />
              )}
            </TouchableOpacity>
            <Text style={styles.googleText}>
              {isGoogleLoading ? 'Loading...' : 'Sign in with Google'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
