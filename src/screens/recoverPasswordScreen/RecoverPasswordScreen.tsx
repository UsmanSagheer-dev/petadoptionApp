import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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

const RecoverPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleRecover = (): void => {
    if (email) {
      Alert.alert('Recovery URL has been sent to your email!');
    } else {
      Alert.alert('Please enter your email');
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => Alert.alert('Go Back')}>
        <Image source={IMAGES.BACKICOn} />
      </TouchableOpacity>
      <Text style={styles.title}>Recover </Text>
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
              onClick={() => {}}
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
  },
  backButton: {
    position: 'absolute',
    top: 50,
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
    fontWeight: 800,
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
    lineHeight:17,
   
  },
  login:{
    marginTop:38
  }
});

export default RecoverPasswordScreen;
