import {ImageBackground, Text, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import IMAGES from '../../assets/images';
import useAuth from '../../hooks/useAuth';
import styles from './style';
import {NavigationProp} from '../../types/types';
const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {showSplash} = useAuth();

  useEffect(() => {
    if (!showSplash) {
      navigation.replace('Login');
    }
  }, [showSplash, navigation]);

  return (
    <ImageBackground
      source={IMAGES.SPLASH}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Make a new </Text>
          <Text style={styles.mainText1}>friend</Text>
          <Text style={styles.subText}>Adopt a Pet Today!</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
