// hooks/useDonations.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchDonations } from '../redux/slices/petSlice';
import { pet } from '../types/types';

export const useDonations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { donations, loading, error } = useSelector((state: RootState) => state.pet);

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