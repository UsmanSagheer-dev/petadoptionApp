import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface Pet {
  id: string;
  name: string;
  type: string;
  petType: string;
  age: string;
  location: string;
  gender: string;
  isFavorite?: boolean;
  imageUrl?: string;
  weight?: string;
  vaccinated?: boolean;
  price?: number;
  description?: string;
  petBreed: any;
  amount?: any;
  error?: any;
}

const useFetchAllPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = auth().currentUser;
        if (!user) {
          setError('User not authenticated');
          return;
        }

        const userDonationsRef = firestore()
          .collection('donations')
          .doc(user.uid)
          .collection('usersDonations');

        const snapshot = await userDonationsRef.get();
        console.log('Fetching all pets for user:', user.uid, 'Total:', snapshot.size);

        const fetchedPets: Pet[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Pet[];

        setPets(fetchedPets);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching all pets:', err.message);
          setError('Failed to fetch pets: ' + err.message);
        } else {
          console.error('Unknown error fetching pets');
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllPets();
  }, []);

  // ✅ Delete function to remove pet from Firestore and update state
  const deletePet = async (petId: string) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        setError('User not authenticated');
        return;
      }

      await firestore()
        .collection('donations')
        .doc(user.uid)
        .collection('usersDonations')
        .doc(petId)
        .delete();

      console.log(`Pet ${petId} deleted successfully`);

      // 🔹 Delete pet from state
      setPets((prevPets) => prevPets.filter(pet => pet.id !== petId));
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return { pets, loading, error, deletePet };
};

export default useFetchAllPets;
