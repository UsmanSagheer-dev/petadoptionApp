import React from 'react';
import { ScrollView, Text } from 'react-native';
import Card from '../../components/card/Card';
import CustomLoader from '../../components/radarLoader/RadarLoader';
import { useDonations } from '../../hooks/useDonations';
import styles from './style';

const CardSection: React.FC = () => {
  const { donations, loading, error, isPetDonation, formatDate } = useDonations();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      {loading ? (
        <CustomLoader />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        donations.map((donation, index) => {
          if (!isPetDonation(donation)) {
            return null;
          }
          
          return (
            <Card
              key={donation.id || index}
              title={donation.petBreed}
              subtitle={donation.petType}
              date={formatDate(donation?.createdAt?.seconds)}
              money={`$${donation.amount || 0}`}
              imageUrl={donation.imageUrl?.[0]}
            />
          );
        })
      )}
    </ScrollView>
  );
};

export default CardSection;