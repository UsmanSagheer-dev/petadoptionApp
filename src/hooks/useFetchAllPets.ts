import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchDonations, deleteDonation} from '../redux/slices/petSlice';
import {pet} from '../types/types';

const useFetchUserDonations = () => {
  const dispatch = useAppDispatch();
  const user = auth().currentUser;

  const {donations, loading, error} = useAppSelector(state => ({
    donations: state.pet.donations,
    loading: state.pet.loading,
    error: state.pet.error,
  }));

  useEffect(() => {
    if (user) {
      dispatch(fetchDonations());
    }
  }, [dispatch, user]);

  const userDonations = donations.filter(
    (donation: pet) => donation.userId === user?.uid,
  );

  const handleDeletePet = async (petId: string) => {
    try {
      await dispatch(deleteDonation(petId)).unwrap();
    } catch (error) {
      console.error('Deletion error:', error);
      throw error;
    }
  };

  return {
    pets: userDonations,
    loading,
    error,
    deletePet: handleDeletePet,
  };
};

export default useFetchUserDonations;
