import {useState, useRef} from 'react';
import {useAppDispatch} from '../hooks/hooks';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, Pet, ProfileData} from '../types/types';
import {requestAdoption} from '../redux/slices/petSlice';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

export const usePetDetails = (selectedPet?: Pet | null) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const firebaseUser = auth().currentUser;
  const [ownerData, setOwnerData] = useState<ProfileData>({
    displayName: 'Loading...',
    photoURL: null,
    name: 'Loading...',
    imageUrl: null,
  });
  const prevPetRef = useRef<Pet | null | undefined>(undefined);

  const fetchOwnerData = async () => {
    if (!selectedPet?.userId) return;

    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(selectedPet.userId)
        .get();

      const userData = userDoc.data();
      setOwnerData({
        displayName: userData?.displayName || 'Pet Owner',
        photoURL: userData?.photoURL || null,
        name: userData?.displayName || 'Pet Owner',
        imageUrl: userData?.photoURL || null,
      });
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Fetch Error',
        text2: err.message || 'Error fetching owner data',
      });
      setOwnerData({
        displayName: 'Pet Owner',
        photoURL: null,
        name: 'Pet Owner',
        imageUrl: null,
      });
    }
  };

  // Check if selectedPet has changed
  if (selectedPet !== prevPetRef.current && selectedPet) {
    fetchOwnerData();
    prevPetRef.current = selectedPet;
  }

  const handleAdoptNow = async () => {
    if (!firebaseUser || !firebaseUser.email || !selectedPet) {
      Toast.show({
        type: 'error',
        text1: 'Adoption Error',
        text2: 'User not logged in, email missing, or pet not selected',
      });
      return;
    }

    try {
      await dispatch(
        requestAdoption({
          donationId: selectedPet.id,
          userData: {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Guest User',
            email: firebaseUser.email,
          },
        }),
      ).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Adoption request submitted successfully',
      });
      navigation.navigate('AdoptNow');
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Adoption Error',
        text2: err.message || 'Error submitting adoption request',
      });
    }
  };

  return {profileData: ownerData, handleAdoptNow, fetchOwnerData};
};

export default usePetDetails;
