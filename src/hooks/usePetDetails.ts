import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { requestAdoption } from '../redux/slices/donateSlice';
import { Pet } from '../types/componentTypes';

interface ProfileData {
  name: string;
  imageUrl: string | null;
}

export const usePetDetails = (selectedPet?: Pet | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const firebaseUser = auth().currentUser;

  const profileData: ProfileData = {
    name: firebaseUser?.displayName || 'Guest User',
    imageUrl: firebaseUser?.photoURL || null,
  };

  const handleAdoptNow = async () => {
    if (!firebaseUser || !firebaseUser.email || !selectedPet) {
      console.error('User not logged in or email not available or pet not selected');
      return;
    }

    try {
      await dispatch(
        requestAdoption({
          donationId: selectedPet.id,
          userData: {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Guest User',
            email: firebaseUser.email
          }
        })
      ).unwrap();

      console.log('Adoption request submitted successfully');
      navigation.navigate('AdoptNow');
    } catch (error) {
      console.error('Error submitting adoption request:', error);
    }
  };

  return { profileData, handleAdoptNow };
};