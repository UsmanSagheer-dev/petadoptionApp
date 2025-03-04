import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TermsCheckboxProps } from "../../types/types";
import styles from "./style";
import COLOR from "../../constant/constant";

const TermsCheckbox = ({ checked, onChange }: TermsCheckboxProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onChange(!checked)}
      >
        {checked && (
          <Text style={[styles.checked, { color:COLOR.infoText, fontSize: 12 }]}>
            ✓
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