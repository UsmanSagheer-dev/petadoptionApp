import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useHeader from '../../hooks/useHeader';
import IMAGES from '../../assets/images/index';
import styles from './style';
import {NavigationProps} from '../../types/types';
const Header = () => {
  const {toggleDrawer, profileImage} = useHeader();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image source={IMAGES.MODELTABL} alt="modeltab" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileScreen' as string)}>
        <Image source={profileImage} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
