import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../types/navigation';
import useHeader from '../../hooks/useHeader';
import IMAGES from '../../assets/images/index';
import styles from './style';

type NavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  'PasswordUpdate'
>;

const Header = () => {
  const {toggleDrawer, profileImage} = useHeader();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image source={IMAGES.MODELTABL} alt="modeltab" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen' as any)}>

        <Image source={profileImage} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
