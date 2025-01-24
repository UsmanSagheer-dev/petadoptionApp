import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

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
  error?:any
}

const useFetchPets = (selectedTab: string) => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchPets = async () => {
        try {
          setLoading(true);
          setError(null);
  
          const petCollection = firestore().collection('donations');
          
          const petTypeMap = {
            'Dogs': 'dog',
            'Cats': 'cat', 
            'Bunnies': 'bunnies',
            'Birds': 'birds',
            'Turtles': 'turtle'
          };
  
          const queryPetType = petTypeMap[selectedTab];
  
          console.log('Querying petType:', queryPetType);
  
          if (!queryPetType) {
            setError('Invalid pet type');
            return;
          }
  
          const snapshot = await petCollection
            .where('petType', '==', queryPetType)
            .get();
  
          console.log('Snapshot size:', snapshot.size);
          console.log('Fetched Documents:', snapshot.docs.map(doc => doc.data()));
  
          const fetchedPets: Pet[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Pet[];
  
          setPets(fetchedPets);
        } catch (err: unknown) {
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
