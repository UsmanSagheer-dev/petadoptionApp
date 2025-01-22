import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TermsCheckboxProps} from '../../types/componentTypes';
const TermsCheckbox = ({checked, onChange}: TermsCheckboxProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onChange(!checked)}>
        {checked && <View style={styles.checked} />}
      </TouchableOpacity>
      <Text style={styles.text}>
        I agree to the <Text style={styles.link}>Terms of service</Text>{' '}
        <Text>and</Text>
        <Text style={styles.link}>Privacy policy</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: '#101C1D',
  },
  text: {
    fontSize: 14,
    fontWeight: 600,
  },
  link: {
    fontFamily: 'MontserratRegular',
    color: '#101C1D',
    textDecorationLine: 'underline',
  },
});

export default TermsCheckbox;
