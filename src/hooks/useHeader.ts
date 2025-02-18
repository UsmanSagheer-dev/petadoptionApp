import { useEffect } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store'; 
import { fetchProfile } from '../redux/slices/profileImageSlice';
import IMAGES from '../assets/images';

const useHeader = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigation = useNavigation();
  const profileData = useSelector((state: RootState) => state.profile.profileData);
  const loading = useSelector((state: RootState) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const profileImage = profileData?.photoURL ? { uri: profileData.photoURL } : IMAGES.PROFILEIMG;

  return { toggleDrawer, profileImage, loading };
};

export default useHeader;