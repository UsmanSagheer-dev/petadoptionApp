import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../types/navigation';
import CustomText from '../../components/customText/CustomText';
import CustomInput from '../../components/input/customInput';
import COLOR from '../../constant/constant';
import LoginButton from '../../components/button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/slices/userSlice';
import { RootState, AppDispatch } from '../../redux/store'; 

type ProfileScreenProps = BottomTabScreenProps<TabParamList, 'ProfileTab'>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch here
  
  // Select user details from the Redux store
  const { userDetails, loading, error } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Dispatch the fetchUser action when the component mounts
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    // If userDetails is available, update the state with the fetched data
    if (userDetails) {
      setName(userDetails.displayName || '');
      setEmail(userDetails.email || '');
    }
  }, [userDetails]);

  const handleUpdateProfile = () => {
    navigation.navigate('PasswordUpdate');
  };

  if (loading) {
    return <ActivityIndicator size="large" color={COLOR.primary} style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Profile Title */}
      <View style={styles.titleContainer}>
        <CustomText title="Profile Settings" style={styles.title} />
      </View>

      {/* Profile Logo Placeholder */}
      <View style={styles.profileLogo}>

      </View>

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
          onClick={handleUpdateProfile}
          title="Update Profile"
          backgroundColor={COLOR.primary}
          textColor={COLOR.white}
          width="100%"
        />
      </View>
    </View>
  );
};

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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
