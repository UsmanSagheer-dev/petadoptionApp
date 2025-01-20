import {View, StyleSheet, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomText from '../../components/customText/CustomText';
import CustomInput from '../../components/input/customInput';
import COLOR from '../../constant/constant';
import LoginButton from '../../components/button/CustomButton';
import {updatePassword, signout} from '../../redux/slices/authSlice'; // Update path as per your project structure
import {AppDispatch} from '../../redux/store'; // Update path as per your project structure

// Define the navigation params type
type RootStackParamList = {
  PasswordUpdate: undefined;
  ProfileTab: undefined;
  Login: undefined;
  // Add other screen params as needed
};

type PasswordUpdateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordUpdate'
>;

const PasswordUpdateScreen: React.FC<PasswordUpdateScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validatePasswords = (): boolean => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return false;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleUpdateProfile = async (): Promise<void> => {
    if (!validatePasswords()) return;
  
    setIsLoading(true);
    try {
      await dispatch(updatePassword({ oldPassword, newPassword })).unwrap();
      Alert.alert('Success', 'Password updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      const errorMessage = error.toString();
  
      if (errorMessage.includes('login again')) {
        Alert.alert('Session Expired', 'Please login again to update your password', [
          {
            text: 'OK',
            onPress: async () => {
              await dispatch(signout());
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <CustomText title="Profile Settings" style={styles.title} />
        </View>
        
        {/* Current Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password</Text>
          <CustomInput
            type="password"
            placeholder=""
            value={oldPassword}
            onChange={setOldPassword}
            secureTextEntry={true}
          />
        </View>

        {/* New Password Input */}
        <View>
          <Text style={styles.label}>New Password</Text>
          <CustomInput
            type="password"
            placeholder=""
            value={newPassword}
            onChange={setNewPassword}
            secureTextEntry={true}
          />
        </View>

        {/* Confirm New Password Input */}
        <View style={styles.inputContainer1}>
          <Text style={styles.label}>Confirm New Password</Text>
          <CustomInput
            type="password"
            placeholder=""
            value={confirmNewPassword}
            onChange={setConfirmNewPassword}
            secureTextEntry={true}
          />
        </View>
      </View>

      {/* Update Button */}
      <View style={styles.buttonContainer}>
        <LoginButton
          onClick={handleUpdateProfile}
          title={isLoading ? "Updating..." : "Update Password"}
          backgroundColor={COLOR.primary}
          textColor={COLOR.white}
          width="100%"
        />
      </View>
    </View>
  );
};

// Define styles interface
interface Styles {
  container: {
    flex: number;
    padding: number;
    backgroundColor: string;
    justifyContent: 'space-between';
  };
  titleContainer: {
    paddingTop: number;
    alignItems: 'center';
    marginBottom: number;
  };
  title: {
    fontSize: number;
    fontWeight: number;
    color: string;
    textAlign: 'center';
    fontFamily: string;
  };
  label: {
    fontSize: number;
    fontWeight: number;
    color: string;
    fontFamily: string;
  };
  inputContainer: {
    marginTop: number;
    marginBottom: number;
  };
  inputContainer1: {
    marginTop: number;
  };
  buttonContainer: {
    marginTop: number;
    justifyContent: 'center';
    alignItems: 'center';
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLOR.white,
    justifyContent: 'space-between',
  },
  titleContainer: {
    paddingTop: 41,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: COLOR.primary,
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
  },
  label: {
    fontSize: 18,
    fontWeight: 600,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  inputContainer: {
    marginTop: 42,
    marginBottom: 20,
  },
  inputContainer1: {
    marginTop: 24,
  },
  buttonContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PasswordUpdateScreen;