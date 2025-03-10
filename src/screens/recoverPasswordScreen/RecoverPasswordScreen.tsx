import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import IMAGES from '../../assets/images';
import COLOR from '../../constants/constant';
import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/customButton/CustomButton';
import auth from '@react-native-firebase/auth';
import {Props} from '../../types/types';
import styles from './style';
import Toast from 'react-native-toast-message';

const RecoverPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');

  const handleRecover = async (): Promise<void> => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your email',
      });
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password reset email sent!',
      });
      setEmail('');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Unable to send reset email',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image source={IMAGES.BACKICON} />
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
          <CustomButton
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
