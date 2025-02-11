import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store'; // Ensure correct path
import { fetchProfile } from '../../redux/slices/profileImageSlice';
import IMAGES from '../../assets/images';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly typed useDispatch
  const navigation = useNavigation();
  const profileData = useSelector((state: RootState) => state.profile.profileData);
  const loading = useSelector((state: RootState) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchProfile()); // Now correctly typed
  }, [dispatch]);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={IMAGES.MODELTABL} alt="modeltab" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={profileData?.imageUrl ? { uri: profileData.imageUrl } : IMAGES.PROFILEIMG}
          style={styles.profile}
          onError={() => console.log('Error loading profile image')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default Header;
