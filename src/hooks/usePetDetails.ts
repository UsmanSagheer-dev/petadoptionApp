import {useState, useEffect} from 'react';
import {useAppDispatch} from '../hooks/hooks';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, Pet} from '../types/types';
import {requestAdoption} from '../redux/slices/donateSlice';
import firestore from '@react-native-firebase/firestore';
import {ProfileData} from '../types/types';

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
            name: userData?.displayName || 'Pet Owner',
            imageUrl: userData?.photoURL || null,
          });
        } catch (error) {
          console.error('Error fetching owner data:', error);
          setOwnerData({
            displayName: 'Pet Owner',
            photoURL: null,
            name: 'Pet Owner',
            imageUrl: null,
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
