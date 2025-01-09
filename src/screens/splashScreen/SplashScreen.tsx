import {ImageBackground, Text, StyleSheet, View} from 'react-native';
import React from 'react';
import IMAGES from '../../assets/images';

const SplashScreen = () => {
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
    fontWeight: 800,
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
  },
  mainText1: {
    color: 'white',
    fontSize: 40,
    fontWeight: 800,
    textAlign: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'MontserratRegular',
  },
});

export default SplashScreen;
