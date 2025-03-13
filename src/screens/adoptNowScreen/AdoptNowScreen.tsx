import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import AdoptNowCard from '../../components/adoptNowCard/AdoptNowCard';
import {useAdoptNowCard} from '../../components/adoptNowCard/useAdoptNowCard';
import styles from './style';

const AdoptNowScreen = () => {
  const {cardsData, hasData, handleContactPress} = useAdoptNowCard();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Donation Requests</Text>
      </View>
    
        <ScrollView>
          {cardsData.map((cardData) => (
            <View style={styles.cardContainer} key={cardData.id}>
              <AdoptNowCard 
                data={cardData} 
                onContactPress={handleContactPress} 
              />
            </View>
          ))}
        </ScrollView>
      
    </View>
  );
};

export default AdoptNowScreen;