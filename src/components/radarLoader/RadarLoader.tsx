import React, { useEffect, useRef } from 'react';
import { View,  Animated, Easing } from 'react-native';
import  styles from './style'
const CustomLoader = () => {

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const animateDots = () => {
    const createAnimation = (value) => {
      return Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(
      Animated.stagger(100, [
        createAnimation(dot1),
        createAnimation(dot2),
        createAnimation(dot3),
      ])
    ).start();
  };

  useEffect(() => {
    animateDots();
  }, []);

  const dot1Style = {
    opacity: dot1,
    transform: [{ translateY: dot1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -15]
    }) }],
  };

  const dot2Style = {
    opacity: dot2,
    transform: [{ translateY: dot2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -15]
    }) }],
  };

  const dot3Style = {
    opacity: dot3,
    transform: [{ translateY: dot3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -15]
    }) }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, styles.dot1, dot1Style]} />
      <Animated.View style={[styles.dot, styles.dot2, dot2Style]} />
      <Animated.View style={[styles.dot, styles.dot3, dot3Style]} />
    </View>
  );
};


export default CustomLoader;