import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
}

const CustomInput = ({
  type,
  placeholder,
  value,
  onChange,
  secureTextEntry,
}: CustomInputProps) => {
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

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#101C1D',
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default CustomInput;
