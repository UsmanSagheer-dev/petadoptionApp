import {View, Text} from 'react-native';
import React from 'react';
import AdoptNowCard from '../../components/adoptNowCard/AdoptNowCard';
import styles from './AdoptNowScreenStyle';
const AdoptNowScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Donation Request</Text>
      </View>
      <View style={styles.cardContainer}>
        <AdoptNowCard />
      </View>
    </View>
  );
};

export default AdoptNowScreen;
