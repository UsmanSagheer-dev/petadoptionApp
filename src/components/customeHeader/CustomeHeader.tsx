import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {CustomeHeaderProps, NavigationProps} from '../../types/types';
import styles from './CustomeHeaderStyle';

const CustomeHeader: React.FC<CustomeHeaderProps> = ({
  title,
  navigateTo,
  onPress,
}) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomeHeader;
