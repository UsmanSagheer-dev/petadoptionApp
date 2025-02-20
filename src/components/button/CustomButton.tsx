import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {LoginButtonProps} from '../../types/componentTypes';
import styles from './style';
import COLOR from '../../constant/constant';

const LoginButton = ({
  onClick,
  title,
  backgroundColor = COLOR.black,
  textColor = COLOR.white,
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

export default LoginButton;
