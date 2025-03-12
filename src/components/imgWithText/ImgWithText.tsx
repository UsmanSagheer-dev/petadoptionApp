import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import {ImgWithTextProps} from 'types';
const ImgWithText: React.FC<ImgWithTextProps> = ({imageSource, label}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};
export default ImgWithText;
