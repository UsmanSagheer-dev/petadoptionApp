import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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
import {RecoverPasswordScreenNavigationProp} from '../../types/types';
import styles from './style';
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



export default RecoverPasswordScreen;
