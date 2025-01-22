import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {LoginButtonProps} from '../../types/componentTypes';
const LoginButton = ({
  onClick,
  title,
  backgroundColor = '#000',
  textColor = '#fff',
  width = '100%',
}: LoginButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor, width}]}
      onPress={onClick}
      activeOpacity={0.9}>
      {typeof title === 'string' ? (
        <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 37,
    alignItems: 'center',
    height: 79,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'MontserratRegular',
  },
});

export default LoginButton;
