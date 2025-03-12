import {ImageBackground, Text, View} from 'react-native';
import React from 'react';
import styles from './style';
import {CardProps} from 'types';
import IMAGES from '../../assets/images/index';
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  date,
  money,
  imageUrl,
}) => {
  return (
    <ImageBackground
      source={imageUrl ? {uri: imageUrl} : IMAGES.PETCARDIMG}
      style={styles.card}
      resizeMode="cover">
      <View style={styles.overlay} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{subtitle}</Text>
      <Text style={styles.datetext}>{date}</Text>
      <Text style={styles.moneytext}>{money}</Text>
    </ImageBackground>
  );
};

export default Card;
