import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../hooks/hooks';
import {RootState} from '../redux/store';
import {fetchProfile} from '../redux/slices/profileImageSlice';

const useProfile = () => {
  const dispatch = useAppDispatch();
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );
  const loading = useSelector((state: RootState) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return {profileData, loading};
};

export default useProfile;
