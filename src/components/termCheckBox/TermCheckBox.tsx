import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TermsCheckboxProps } from "../../types/componentTypes";
import styles from "./style";

const TermsCheckbox = ({ checked, onChange }: TermsCheckboxProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onChange(!checked)}
      >
        {checked && <View style={styles.checked} />}
      </TouchableOpacity>
      <Text style={styles.text}>
        I agree to the <Text style={styles.link}>Terms of service</Text>{" "}
        <Text>and</Text> <Text style={styles.link}>Privacy policy</Text>
      </Text>
    </View>
  );
};

export default TermsCheckbox;
