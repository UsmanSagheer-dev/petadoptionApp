import { View, Text } from 'react-native';
import React from 'react';
import styles from './style';
import { CardProps } from '../../types/componentTypes';

const Card: React.FC<CardProps> = ({ title, subtitle, date, money }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{subtitle}</Text>
      <Text style={styles.datetext}>{date}</Text>
      <Text style={styles.moneytext}>{money}</Text>
    </View>
  );
};

export default Card;
