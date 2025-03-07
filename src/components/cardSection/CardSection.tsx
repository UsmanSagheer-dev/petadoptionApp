// components/CardSection.tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import Card from '../../components/card/Card'; // Adjust path as needed
import CustomLoader from '../../components/radarLoader/RadarLoader'; // Adjust path as needed
import { useDonations } from '../../hooks/useDonations'; // Adjust path as needed
import styles from './style'; // Adjust path as needed

const CardSection: React.FC = () => {
  const { pet, loading, error, isPetDonation, formatDate } = useDonations();

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!pet || pet.length === 0) {
    return <Text style={styles.noDataText}>No pet donations available</Text>;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {pet.map((petItem, index) => {
        if (!isPetDonation(petItem)) {
          return null; 
        }

        return (
          <Card
            key={petItem.id || index} // Use id if available, fallback to index
            title={petItem.petBreed || 'Unknown Breed'}
            subtitle={petItem.petType || 'Unknown Type'}
            date={formatDate(petItem.createdAt)} // Pass full timestamp object
            money={`$${petItem.amount || 0}`} // Ensure amount is always a number or 0
            imageUrl={petItem.imageUrl?.[0] || ''} // Fallback to empty string if no image
          />
        );
      })}
    </ScrollView>
  );
};

export default CardSection;