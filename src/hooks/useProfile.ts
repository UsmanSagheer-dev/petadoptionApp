import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../hooks/hooks';
import {RootState} from '../redux/store';
import {fetchProfile} from '../redux/slices/authSlice'; 

const useProfile = () => {
  const dispatch = useAppDispatch();
  const profileData = useSelector((state: RootState) => state.auth.profileData);
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return {profileData, loading};
};

export default useProfile;