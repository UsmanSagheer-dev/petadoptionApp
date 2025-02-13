import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {CustomeHeaderProps} from '../../types/componentTypes';
import styles from './style';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'DonateScreen'
>;

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
