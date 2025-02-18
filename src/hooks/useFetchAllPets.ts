import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchDonations, deleteDonation } from '../redux/slices/donateSlice';
import auth from '@react-native-firebase/auth';
import { PetDonation } from '../types/auth'; 

const useFetchUserDonations = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = auth().currentUser;

  const { donations, loading, error } = useSelector((state: RootState) => ({
    donations: state.donation.donations,
    loading: state.donation.loading,
    error: state.donation.error,
  }));

  useEffect(() => {
    if (user) {
      dispatch(fetchDonations());
    }
  }, [dispatch, user]);

  const userDonations = donations.filter(
    (donation: PetDonation) => donation.userId === user?.uid
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