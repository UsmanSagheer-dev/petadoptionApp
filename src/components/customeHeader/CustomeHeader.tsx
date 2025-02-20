import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {CustomeHeaderProps,NavigationProps} from '../../types/types';
import styles from './style';
const CustomeHeader: React.FC<CustomeHeaderProps> = ({title}) => {
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

export default CustomeHeader;
