import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {updateProfile, fetchProfile} from '../redux/slices/profileImageSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';

const useProfileScreen = () => {
  const dispatch = useAppDispatch();
  const {userDetails} = useAppSelector(state => state.user);
  const {profileData, loading: profileLoading} = useAppSelector(
    state => state.profile,
  );

  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData || userDetails) {
      setName(profileData?.displayName ?? userDetails?.displayName ?? '');
      setEmail(profileData?.email ?? userDetails?.email ?? '');
      setImageUri(profileData?.photoURL ?? userDetails?.photoURL ?? null);
    }
  }, [profileData, userDetails]);

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
        Alert.alert('Error', 'Failed to process image');
        return;
      }

      const {base64} = result.assets[0];
      const imageString = `data:image/jpeg;base64,${base64}`;
      setImageUri(imageString);
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUploading(true);
      await dispatch(
        updateProfile({
          name,
          imageUrl: imageUri || '',
        }),
      ).unwrap();

      dispatch(fetchProfile());
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      const err = error as Error;
      Alert.alert('Error', err.message || 'Failed to update profile');
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
    loading: profileLoading || uploading,
  };
};

export default useProfileScreen;
