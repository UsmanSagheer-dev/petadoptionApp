import React from 'react';
import {View, Text, TextStyle} from 'react-native';
import styles from './style';

interface CustomTextProps {
  title: string;
  style?: TextStyle;
}

const CustomText: React.FC<CustomTextProps> = ({title, style}) => {
  return (
    <View>
      <Text style={[styles.text, style]}>{title}</Text>
    </View>
  );
};

export default CustomText;
