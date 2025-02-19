import {useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {AppDispatch} from '../redux/store';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import {requestAdoption} from '../redux/slices/donateSlice';
import {Pet} from '../types/componentTypes';

import firestore from '@react-native-firebase/firestore';

// Update the usePetDetails hook
interface ProfileData {
  displayName: string;
  photoURL: string | null;
}

export const usePetDetails = (selectedPet?: Pet | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const firebaseUser = auth().currentUser;
  const [ownerData, setOwnerData] = useState<ProfileData>({
    displayName: 'Loading...',
    photoURL: null,
  });

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (selectedPet?.userId) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(selectedPet.userId)
            .get();

          const userData = userDoc.data();
          setOwnerData({
            displayName: userData?.displayName || 'Pet Owner',
            photoURL: userData?.photoURL || null,
          });
        } catch (error) {
          console.error('Error fetching owner data:', error);
          setOwnerData({
            displayName: 'Pet Owner',
            photoURL: null,
          });
        }
      }
    };

    if (selectedPet) {
      fetchOwnerData();
    }
  }, [selectedPet]);

  const handleAdoptNow = async () => {
    if (!firebaseUser || !firebaseUser.email || !selectedPet) {
      console.error(
        'User not logged in or email not available or pet not selected',
      );
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

      console.log('Adoption request submitted successfully');
      navigation.navigate('AdoptNow');
    } catch (error) {
      console.error('Error submitting adoption request:', error);
    }
  };

  return {profileData: ownerData, handleAdoptNow};
};
