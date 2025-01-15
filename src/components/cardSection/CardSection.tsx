import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Card from '../../components/card/Card';

const CardSection = () => {
  const cardData = [
    { title: 'Card 1', subtitle: 'This is card 1', date: '2025-01-15', money: '$100' },
    { title: 'Card 2', subtitle: 'This is card 2', date: '2025-01-16', money: '$200' },
    { title: 'Card 3', subtitle: 'This is card 3', date: '2025-01-17', money: '$300' },
    { title: 'Card 4', subtitle: 'This is card 4', date: '2025-01-18', money: '$400' },
    { title: 'Card 5', subtitle: 'This is card 5', date: '2025-01-19', money: '$500' },
  ];

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.scrollContainer}
    >
      {cardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          date={item.date}
          money={item.money}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // No padding to keep it clean
   
  },
});

export default CardSection;
