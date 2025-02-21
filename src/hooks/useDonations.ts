import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {fetchDonations} from '../redux/slices/donateSlice';
import {PetDonation} from '../types/types';
export const useDonations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {donations, loading, error} = useSelector(
    (state: RootState) => state.donation,
  );
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
