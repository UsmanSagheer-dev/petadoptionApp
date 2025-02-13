import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../types/navigation';
import useHeader from '../../hooks/useHeader';
import IMAGES from '../../assets/images/index';

// Define navigation type
type NavigationProps = NativeStackNavigationProp<AppStackParamList, 'PasswordUpdate'>;

const Header = () => {
  const { toggleDrawer, profileImage } = useHeader();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image source={IMAGES.MODELTABL} alt="modeltab" />
      </TouchableOpacity>

      {/* Navigate to PasswordUpdate screen when clicking on the profile image */}
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Image source={profileImage} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default Header;
