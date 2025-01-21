import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import COLOR from '../../constant/constant';

interface PickerInputProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
}

const PickerInput: React.FC<PickerInputProps> = ({ label, selectedValue, onValueChange, items }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
            {items.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      </View>
    );
  };
const styles = StyleSheet.create({
    container: {
      marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: 600,
        fontFamily: 'MontserratRegular',
        color:COLOR.primary
    },
    pickerContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#101C1D',
    },
    picker: {
      fontSize: 16,
    },
  });
  

export default PickerInput;
