import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './hooks';
import {fetchDonations} from '../redux/slices/donateSlice';
import {PetDonation} from '../types/types';

export const useDonations = () => {
  const dispatch = useAppDispatch();
  const {donations, loading, error} = useAppSelector(state => state.donation);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const isPetDonation = (donation: unknown): donation is PetDonation => {
    const d = donation as any;
    return (
      d &&
      typeof d === 'object' &&
      'petBreed' in d &&
      'petType' in d &&
      'amount' in d &&
      'imageUrl' in d
    );
  };

  const formatDate = (seconds?: number) => {
    if (!seconds) return 'Pending...';
    return new Date(seconds * 1000).toISOString().split('T')[0];
  };

  return {
    donations,
    loading,
    error,
    isPetDonation,
    formatDate,
  };
};
