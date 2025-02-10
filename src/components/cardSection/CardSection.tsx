import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store';
import {fetchDonations} from '../../redux/slices/donateSlice';
import Card from '../../components/card/Card';
import {PetDonation} from '../../types/auth';
// import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
const CardSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state ko fetch karna
  const {donations, loading, error} = useSelector(
    (state: RootState) => state.donation,
  );

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        donations.map((donation: PetDonation, index: number) => (
          <Card
  key={donation.id || index}
  title={donation.petBreed}
  subtitle={donation.petType}
  date={
    donation?.createdAt?.seconds
      ? new Date(donation.createdAt.seconds * 1000).toISOString().split('T')[0]
      : 'N/A'
  }
  money={`$${donation.amount || 0}`}
/>

        
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
});

export default CardSection;
