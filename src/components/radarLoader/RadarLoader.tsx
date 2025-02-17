import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const CustomLoader = () => {
  // Animation values کے لیے refs
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  // Animation کا لوپ
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

  // Animation styles
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 5,
  },
  dot1: {
    backgroundColor: '#FF6B6B',
  },
  dot2: {
    backgroundColor: '#4ECDC4',
  },
  dot3: {
    backgroundColor: '#45B7D1',
  },
});

export default CustomLoader;