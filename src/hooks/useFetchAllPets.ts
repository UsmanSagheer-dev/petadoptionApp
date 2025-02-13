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

const useFetchUserDonations = () => {
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
      .where('userId', '==', user.uid); 

    const unsubscribe = userDonationsRef.onSnapshot(
      (snapshot) => {
        console.log('User donations fetched:', snapshot.size);

        const fetchedPets: Pet[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Pet[];

        setPets(fetchedPets);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching user donations:', error.message);
        setError('Failed to fetch pets: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); 
  }, []);


  const deletePet = async (petId: string) => {
    try {
      await firestore().collection('donations').doc(petId).delete();
      console.log(`Pet ${petId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return { pets, loading, error, deletePet };
};

export default useFetchUserDonations;
