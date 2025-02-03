import { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

export const useCustomBottomSheet = (isVisible: boolean) => {
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? height * 0.4 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return { translateY };
};
