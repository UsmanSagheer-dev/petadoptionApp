import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Pet} from '../types/types';
import {PET_TYPE_MAP} from '../constant/constant';

const useFetchPets = (selectedTab: string) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryPetType = PET_TYPE_MAP[selectedTab];

        if (!queryPetType) {
          setError('Invalid pet type');
          return;
        }

        const snapshot = await firestore()
          .collection('donations')
          .where('petType', '==', queryPetType)
          .get();

        const currentUserId = auth().currentUser?.uid;

        const fetchedPets: Pet[] = snapshot.docs
          .map(doc => {
            const data = doc.data() as Pet;
            return {
              ...data,
              id: doc.id,
            };
          })

          .filter(pet => pet.userId !== currentUserId);

        setPets(fetchedPets);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching pets:', err.message);
          setError('Failed to fetch pets: ' + err.message);
        } else {
          console.error('Unknown error fetching pets');
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [selectedTab]);

  return {pets, loading, error};
};

export default useFetchPets;
