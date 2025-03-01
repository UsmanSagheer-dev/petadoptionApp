import React from 'react';
import {TextInput} from 'react-native';
import {styles} from './style';
import {CustomInputProps} from '../../types/types';

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChange,
  secureTextEntry,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  );
};

export default CustomInput;
