import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import CustomText from '../../components/customText/CustomText';
import CustomInput from '../../components/input/customInput';
import COLOR from '../../constant/constant';
import LoginButton from '../../components/button/CustomButton';

// Type for ProfileScreen props
type ProfileScreenProps = NativeStackScreenProps<AppStackParamList, 'Profiles'>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
  // Extract route params
  const { userId, name: initialName } = route.params || {};
  
  // State variables for form fields
  const [name, setName] = useState<string>(initialName || '');
  const [email, setEmail] = useState<string>('');

  const handleUpdateProfile = () => {
    console.log('Profile updated for:', name, email);
    navigation.navigate('passwrdUpdates'); // Navigate to Password Update Screen
  };

  return (
    <View style={styles.container}>
      {/* Profile Title */}
      <View style={styles.titleContainer}>
        <CustomText title="Profile Settings" style={styles.title} />
      </View>

      {/* Profile Logo Placeholder */}
      <View style={styles.profileLogo} />

      {/* Input Fields */}
      <View style={styles.inputFields}>
        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <CustomInput
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={setName}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <CustomInput
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={setEmail}
          />
        </View>
      </View>

      {/* Update Profile Button */}
      <View style={styles.buttonContainer}>
        <LoginButton
          onClick={handleUpdateProfile} // Fixed incorrect prop name
          title="Update Profile"
          backgroundColor={COLOR.primary}
          textColor={COLOR.white}
          width="100%"
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginTop: 41,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR.primary,
  },
  profileLogo: {
    marginTop: 36,
    width: 125,
    height: 125,
    borderRadius: 62.5,
    borderColor: COLOR.primary,
    borderWidth: 1,
    alignSelf: 'center',
    borderStyle: 'dashed',
    backgroundColor: COLOR.BorderBack,
  },
  inputFields: {
    marginTop: 42,
    marginBottom: 50,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: COLOR.primary,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
});

export default ProfileScreen;
