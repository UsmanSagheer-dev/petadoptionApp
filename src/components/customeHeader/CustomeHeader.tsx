import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import COLOR from '../../constant/constant';

interface CustomeHeaderProps {
  title: string;
  onPress: () => void;
}

const CustomeHeader: React.FC<CustomeHeaderProps> = ({ title, onPress }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color:COLOR.primary, 
    fontFamily: 'Montserrat-Regular',
  },
  plus: {
    fontSize: 36,
    fontWeight: '500',
    color:COLOR.primary,  
  },
});

export default CustomeHeader;
