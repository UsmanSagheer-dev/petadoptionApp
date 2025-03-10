import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchDonations} from '../redux/slices/petSlice';
import {pet} from '../types/types';

export const useDonations = () => {
  const dispatch = useAppDispatch();
  const {donations, loading, error} = useAppSelector(state => state.pet);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString();
      }
      return new Date(timestamp).toLocaleDateString();
    } catch (e) {
      return 'Invalid date';
    }
  };

  const isPetDonation = (item: any): item is pet => {
    return item && item.petType !== undefined && item.petBreed !== undefined;
  };

  return {
    pet: donations,
    loading,
    error,
    isPetDonation,
    formatDate,
  };
};