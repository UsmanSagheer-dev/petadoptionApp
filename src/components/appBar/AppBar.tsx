import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {CustomeHeaderProps, NavigationProps} from 'types';
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constants/constant';
const AppBar: React.FC<CustomeHeaderProps> = ({title, navigateTo, onPress}) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={handlePress}>
        <MaterialIcons name="add" size={30} color={COLOR.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default AppBar;
