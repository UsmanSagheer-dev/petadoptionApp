import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import COLOR from '../../constants/constant';
import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/customButton/CustomButton';
import { Props } from 'types';
import styles from './style';
import useRecoverPassword from './useRecoverPassword';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const RecoverPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { email, setEmail, handleRecover } = useRecoverPassword();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
         <MaterialIcons name="keyboard-backspace" size={25} color={COLOR.black} />
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