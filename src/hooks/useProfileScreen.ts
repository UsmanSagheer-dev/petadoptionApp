import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {updateProfile, fetchProfile} from '../redux/slices/authSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {unwrapResult} from '@reduxjs/toolkit';

const useProfileScreen = () => {
  const dispatch = useAppDispatch();
  const {user, profileData, loading} = useAppSelector(state => state.auth);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData || user) {
      setName(profileData?.displayName ?? user?.displayName ?? '');
      setEmail(profileData?.email ?? user?.email ?? '');
      setImageUri(profileData?.photoURL ?? user?.photoURL ?? null);
    }
  }, [profileData, user]);

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
        includeBase64: true,
      });

      if (result.didCancel) {
        return;
      }

      if (
        !result.assets ||
        result.assets.length === 0 ||
        !result.assets[0].base64
      ) {
        return;
      }

      const {base64} = result.assets[0];
      const imageString = `data:image/jpeg;base64,${base64}`;
      setImageUri(imageString);
    } catch (error) {}
  };

  const handleUpdateProfile = async () => {
    try {
      setUploading(true);

      const resultAction = await dispatch(
        updateProfile({
          name,
          imageUrl: imageUri || '',
        }),
      );

      const result = unwrapResult(resultAction);

      await dispatch(fetchProfile());
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    imageUri,
    pickImage,
    handleUpdateProfile,
    loading: loading || uploading,
  };
};

export default useProfileScreen;
