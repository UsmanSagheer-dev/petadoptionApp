import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchDonations, deleteDonation} from '../redux/slices/petSlice';
import {Pet} from 'types';

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
    (donation: Pet) => donation.userId === user?.uid,
  );

  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeletePet = async (petId: string) => {
    try {
      await dispatch(deleteDonation(petId)).unwrap();
      setDeleteError(null);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete donation';
      setDeleteError(errorMessage);
      throw err;
    }
  };

  return {
    pets: userDonations,
    loading,
    error,
    deleteError,
    deletePet: handleDeletePet,
  };
};

export default useFetchUserDonations;
