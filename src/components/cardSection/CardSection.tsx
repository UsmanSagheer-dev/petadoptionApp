import React, {useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store';
import {fetchDonations} from '../../redux/slices/donateSlice';
import Card from '../../components/card/Card';
import {PetDonation} from '../../types/auth';
import styles from './style';
import CustomLoader from '../../components/radarLoader/RadarLoader';

const CardSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

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
       <CustomLoader/>
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
                ? new Date(donation.createdAt.seconds * 1000)
                    .toISOString()
                    .split('T')[0]
                : 'Pending...'
            }
            money={`$${donation.amount || 0}`}
          />
        ))
      )}
    </ScrollView>
  );
};

export default CardSection;
