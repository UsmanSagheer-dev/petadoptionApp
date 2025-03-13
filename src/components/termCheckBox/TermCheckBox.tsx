import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TermsCheckboxProps} from 'types';
import styles from './style';
import COLOR from '../../constants/constant';
import Ionicons from "react-native-vector-icons/Ionicons";
const TermsCheckbox = ({checked, onChange}: TermsCheckboxProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onChange(!checked)}>
        {checked && (
          <Text style={[styles.checked, {color: COLOR.infoText, fontSize: 12}]}>
          <Ionicons name="checkmark-outline"  color={COLOR.infoText}  />
          </Text>
        )}
      </TouchableOpacity>
      <Text style={styles.text}>
        I agree to the <Text style={styles.link}>Terms of service</Text>
        <Text>and</Text> <Text style={styles.link}>Privacy policy</Text>
      </Text>
    </View>
  );
};

export default TermsCheckbox;
