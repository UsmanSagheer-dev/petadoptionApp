import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation'; 
import COLOR from '../../constant/constant';
import { CustomeHeaderProps } from '../../types/componentTypes';
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'DonateScreen'>;

const CustomeHeader: React.FC<CustomeHeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProps>(); 

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DonateScreen')}>
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
    color: COLOR.primary,
    fontFamily: 'Montserrat-Regular',
  },
  plus: {
    fontSize: 36,
    fontWeight: '500',
    color: COLOR.primary,
  },
});

export default CustomeHeader;
