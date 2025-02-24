import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {CustomeHeaderProps, NavigationProps} from '../../types/types';
import styles from './CustomeHeaderStyle';
const CustomeHeader: React.FC<CustomeHeaderProps> = ({title}) => {
  const navigation = useNavigation<NavigationProps>();
  const handleDonatePress = () => {
      navigation.navigate('DonateScreen');
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={handleDonatePress}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomeHeader;
