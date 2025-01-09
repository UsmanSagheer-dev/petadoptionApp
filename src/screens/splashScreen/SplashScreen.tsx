import { ImageBackground, Text, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import IMAGES from '../../assets/images';

type NavigationProp = {
  replace: (screen: string) => void;
};

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();  // Type the navigation hook

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');  // Navigate to Login screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);  // Cleanup the timer
  }, [navigation]);

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

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#101C1DC9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    padding: 20,
  },
  mainText: {
    color: 'white',
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
  },
  mainText1: {
    color: 'white',
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'MontserratRegular',
  },
});

export default SplashScreen;
