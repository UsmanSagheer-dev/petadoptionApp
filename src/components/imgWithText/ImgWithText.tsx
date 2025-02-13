import React from 'react';
import {View, Text, Image, ImageSourcePropType} from 'react-native';
import styles from './ImgWithTextStyles';

interface ImgWithTextProps {
  imageSource: ImageSourcePropType;
  label: string;
}

const ImgWithText: React.FC<ImgWithTextProps> = ({imageSource, label}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};

export default ImgWithText;
