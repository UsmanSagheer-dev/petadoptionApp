import {
  View,
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
import styles from './style';
const ProfileScreen = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    imageUri,
    pickImage,
    handleUpdateProfile,
    loading,
  } = useProfileScreen();

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
          <Image source={{uri: imageUri}} style={styles.profileImage} />
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

export default ProfileScreen;
