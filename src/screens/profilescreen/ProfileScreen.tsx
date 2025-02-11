
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import CustomText from '../../components/customText/CustomText';
import CustomInput from '../../components/input/customInput';
import LoginButton from '../../components/button/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useProfileScreen from '../../hooks/useProfileScreen';
import COLOR from '../../constant/constant';
import { useState } from 'react';

const ProfileScreen = ({ navigation }) => {
  const { name, setName, email, setEmail, imageUri, pickImage, loading } =
    useProfileScreen(navigation);
    const [imageLoading, setImageLoading] = useState(false); // Add this line
  const handleUpdateProfile = () => {
    navigation.navigate('PasswordUpdate');
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLOR.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText title="Profile Settings" style={styles.title} />
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.profileLogo}>
        {loading ? (
          <ActivityIndicator size="small" color={COLOR.primary} />
        ) : imageUri ? (
          <Image 
            source={{ uri: imageUri }} 
            style={styles.profileImage} 
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
        ) : (
          <MaterialIcons name="add-a-photo" size={40} color={COLOR.primary} />
        )}
      </TouchableOpacity>

      <View style={styles.inputFields}>
        <View style={styles.inputContainer}>
          <CustomText title="Username" style={styles.label} />
          <CustomInput
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={text => setName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <CustomText title="Email" style={styles.label} />
          <CustomInput
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={text => setEmail(text)}
          />
        </View>
      </View>

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
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
