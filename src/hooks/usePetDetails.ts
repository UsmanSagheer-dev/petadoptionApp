import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProfile } from '../redux/slices/profileImageSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

export const usePetDetails = (selectedPet: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const firebaseUser = auth().currentUser;
  
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const profileData = useSelector((state: RootState) => state.profile.profileData);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleAdoptNow = async () => {
    if (!firebaseUser) {
      console.error('User not logged in');
      return;
    }
    try {
      await firestore().collection('adoptionRequests').add({
        userId: firebaseUser.uid,
        userName: profileData?.name || 'Guest User',
        userEmail: currentUser?.email || firebaseUser?.email,
        petId: selectedPet.id,
        petName: selectedPet.petBreed,
        petType: selectedPet.petType,
        petAge: selectedPet.age,
        petGender: selectedPet.gender,
        petWeight: selectedPet.weight,
        petVaccinated: selectedPet.vaccinated,
        petLocation: selectedPet.location,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Adoption request submitted successfully');
      navigation.navigate('AdoptNow');
    } catch (error) {
      console.error('Error submitting adoption request:', error);
    }
  };

  return { profileData, handleAdoptNow };
};
