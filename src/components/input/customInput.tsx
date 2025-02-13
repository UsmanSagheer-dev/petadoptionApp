import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';

interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
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
