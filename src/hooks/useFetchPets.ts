import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Pet } from '../types/componentTypes';
import { PET_TYPE_MAP } from '../constant/constant';

const useFetchPets = (selectedTab: string) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = auth().currentUser;
        if (!user) {
          setError('User not authenticated');
          return;
        }

        const petCollection = firestore()
          .collection('donations')
          .doc(user.uid) // Get user-specific donations
          .collection('usersDonations'); // Fetch from user's donations

        const queryPetType = PET_TYPE_MAP[selectedTab];

        if (!queryPetType) {
          setError('Invalid pet type');
          return;
        }

        const snapshot = await petCollection
          .where('petType', '==', queryPetType)
          .get();

        const fetchedPets: Pet[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Pet[];

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

  return { pets, loading, error };
};

export default useFetchPets;
