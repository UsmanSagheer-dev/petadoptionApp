import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import COLOR from '../../constant/constant';

// Props ka Type Define Karein
interface CardProps {
  title: string;
  subtitle: string;
  date: string;
  money: string;
}

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLOR.quaternary,
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: 'justify',
  },
  title: {
    fontSize: 29,
    fontWeight: '800',
    fontFamily: 'MontserratRegular',
    color: COLOR.white,
  },
  datetext: {
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    color: COLOR.white,
  },
  moneytext: {
    fontSize: 25,
    fontWeight: '800',
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
    marginTop: 5,
  },
});

export default Card;
