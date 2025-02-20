import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { CustomTextProps } from '../../types/componentTypes';

const CustomText: React.FC<CustomTextProps> = ({ title, style }) => {
  return (
    <View>
      <Text style={[styles.text, style]}>{title}</Text>
    </View>
  );
};

export default CustomText;
