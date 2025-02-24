import { useEffect } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchProfile } from '../redux/slices/profileImageSlice';
import IMAGES from '../assets/images';

const useHeader = () => {
  const dispatch = useAppDispatch(); 
  const navigation = useNavigation();
  const profileData = useAppSelector(state => state.profile.profileData);
  const loading = useAppSelector(state => state.profile.loading);

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
