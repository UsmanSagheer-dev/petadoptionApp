import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {fetchDonations} from '../redux/slices/donateSlice';
const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );
  const loading = useSelector((state: RootState) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  return {profileData, loading};
};

export default useProfile;
