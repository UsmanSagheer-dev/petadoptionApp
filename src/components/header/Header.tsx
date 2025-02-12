import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import useHeader from '../../hooks/useHeader';
import IMAGES from '../../assets/images/index';

const Header = () => {
  const { toggleDrawer, profileImage } = useHeader();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image source={IMAGES.MODELTABL} alt="modeltab" />
      </TouchableOpacity>

      <TouchableOpacity>
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
    paddingHorizontal: 15,
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
