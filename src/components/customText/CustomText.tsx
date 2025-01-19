import COLOR from '../../constant/constant';
import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';

interface CustomTextProps {
  title: string; 
  style?: TextStyle;
}

const CustomText: React.FC<CustomTextProps> = ({ title, style }) => {
  return (
    <View>
      <Text style={[styles.text, style]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 700,
    color:COLOR.primary,
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
  },
});

export default CustomText;
