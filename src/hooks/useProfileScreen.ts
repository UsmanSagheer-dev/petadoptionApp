import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {updateProfile, fetchProfile} from '../redux/slices/authSlice'; // Ensure this path points to the updated authSlice
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';

const useProfileScreen = () => {
  const dispatch = useAppDispatch();
  // Access data from the updated authSlice
  const {user, profileData, loading} = useAppSelector(state => state.auth);

  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Fetch profile data on mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Sync local state with Redux state when user or profileData changes
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

      // Fetch updated profile data after update
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
    loading: loading || uploading, // Combine Redux loading with local uploading state
  };
};

export default useProfileScreen;