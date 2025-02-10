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
    const user = auth().currentUser;
    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const userDonationsRef = firestore()
      .collection('donations')
      .doc(user.uid)
      .collection('usersDonations');

    // ✅ Real-time listener added
    const unsubscribe = userDonationsRef.onSnapshot(
      (snapshot) => {
        console.log('Live updates received:', snapshot.size);

        const fetchedPets: Pet[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Pet[];

        setPets(fetchedPets);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching real-time updates:', error.message);
        setError('Failed to fetch pets: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // 🔹 Cleanup function to unsubscribe
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
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return { pets, loading, error, deletePet };
};

export default useFetchAllPets;
