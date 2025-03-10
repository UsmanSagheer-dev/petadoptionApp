import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchDonations } from '../redux/slices/petSlice';
import { Pet } from '../types/types';

export const useDonations = () => {
  const dispatch = useAppDispatch();
  const { donations, loading, error } = useAppSelector((state) => state.pet);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const formatDate = (timestamp?: any): string => {
    if (!timestamp) return 'Unknown date';
    try {
      if ('toDate' in timestamp) {
        return timestamp.toDate().toLocaleDateString();
      }
      return new Date(timestamp).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  const isPetDonation = (item: any): item is Pet => {
    return (
      item !== null &&
      typeof item === 'object' &&
      'petType' in item &&
      'petBreed' in item
    );
  };

  return {
    pet: donations,
    loading,
    error,
    isPetDonation,
    formatDate,
  };
};