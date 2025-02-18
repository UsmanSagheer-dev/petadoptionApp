import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import IMAGES from '../../assets/images';
import COLOR from '../../constant/constant';
import CustomInput from '../../components/input/customInput';
import LoginButton from '../../components/button/CustomButton';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  RecoverPassword: undefined;
  Login: undefined;
};

type RecoverPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RecoverPassword'
>;
interface Props {
  navigation: RecoverPasswordScreenNavigationProp;
}
const RecoverPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const handleRecover = async (): Promise<void> => {
    if (email) {
      try {
        const methods = await auth().sendPasswordResetEmail(email);
        console.log('methods:', methods);
        console.log('Password reset email sent successfully');
        Alert.alert('Success', 'Password reset email sent!');
        setEmail('');
      } catch (error: any) {
        console.error('Error sending password reset email:', error);
        Alert.alert('Error', error.message || 'Unable to send reset email');
      }
    } else {
      Alert.alert('Error', 'Please enter your email');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image source={IMAGES.BACKICOn} />
      </TouchableOpacity>
      <Text style={styles.title}>Recover</Text>
      <Text style={styles.title}>Password</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Email</Text>
        <CustomInput
          type="email"
          placeholder=""
          value={email}
          onChange={text => setEmail(text)}
        />
        <Text style={styles.description}>
          Put your email above to get recovery URL
        </Text>
        <View style={styles.login}>
          <LoginButton
            onClick={handleRecover}
            title="Recover"
            backgroundColor={COLOR.primary}
            textColor={COLOR.white}
            width={185}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 27,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  content: {
    width: '100%',
    marginTop: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  label: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'MontserratRegular',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 17,
  },
  login: {
    marginTop: 38,
  },
});

export default RecoverPasswordScreen;
