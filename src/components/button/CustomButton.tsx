import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface LoginButtonProps {
  onClick: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  width?: string | number; 
}

const LoginButton = ({
  onClick,
  title,
  backgroundColor = '#000',
  textColor = '#fff',
  width = '100%', 
}: LoginButtonProps) => {
  const buttonStyle: ViewStyle = { backgroundColor, width: width as any };
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onClick}
      activeOpacity={0.9}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius:37,
    alignItems: 'center',
    height:79,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight:700,
  fontFamily: 'MontserratRegular',
  },
});

export default LoginButton;
