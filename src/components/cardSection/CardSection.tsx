import React from 'react';
import {ScrollView, Text} from 'react-native';
import Card from '../../components/card/Card';
import Loader from '../loader/Loader';
import {useDonations} from '../../hooks/useDonations';
import styles from './style';
import Toast from 'react-native-toast-message';

const CardSection: React.FC = () => {
  const {pet, loading, error, isPetDonation, formatDate} = useDonations();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error || 'Something went wrong!',
    });
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!pet?.length) {
   
    return <Text style={styles.noDataText}>No pet donations available</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {pet?.map((petItem, index) => {
        if (!isPetDonation(petItem)) {
          return null;
        }

        return (
          <Card
            key={petItem?.id ?? index}
            title={petItem?.petBreed ?? 'Unknown Breed'}
            subtitle={petItem?.petType ?? 'Unknown Type'}
            date={formatDate(petItem?.createdAt)}
            money={`$${petItem?.amount ?? 0}`}
            imageUrl={petItem?.imageUrl?.[0] ?? ''}
          />
        );
      })}
    </ScrollView>
  );
};

export default CardSection;
