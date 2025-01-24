import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import SearchInput from '../../components/searcInput/SearchInput';
import HorizontalTabs from '../../components/horizentolTabs/HorizentolTabs';
import PetCard from '../../components/petCard/PetCard';
import CustomBottomSheet from '../../components/petDetailsModal/PetDetailsModal';
import IMAGES from '../../assets/images/index';

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
  
}

const SearchScreen = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>('Dog');

  const scrollViewRef = useRef<ScrollView>(null); // ScrollView ka reference

  const tabs = [
    { id: 'dogs', label: 'Dogs' },
    { id: 'cats', label: 'Cats' },
    { id: 'bunnies', label: 'Bunnies' },
    { id: 'birds', label: 'Birds' },
    { id: 'turtles', label: 'Turtles' },
  ];

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const petCollection = firestore().collection('donations');
        
        // Log the exact petType you're querying
        const queryPetType = selectedTab.slice(0, -1).toLowerCase(); 

        console.log('Querying petType:', queryPetType);
    
        const snapshot = await petCollection
          .where('petType', '==', queryPetType)
          .get();
    
        console.log('Snapshot size:', snapshot.size);
    
        const fetchedPets: Pet[] = snapshot.docs.map(doc => {
          const petData = doc.data();
          console.log('Pet document:', petData);
          return {
            id: doc.id,
            ...petData
          } as Pet;
        });
    
        setPets(fetchedPets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setLoading(false);
      }
    };

    fetchPets();
  }, [selectedTab]);

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const handleFavoriteToggle = async (petId: string) => {
    // Implement favorite toggle logic
  };

  const handlePetPress = (pet: Pet) => {
    setSelectedPet(pet);
    setIsBottomSheetVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput />
      </View>
      <View style={styles.tabsContainer}>
        <HorizontalTabs 
          tabs={tabs} 
          onTabPress={handleTabPress} 
          selectedTab={selectedTab}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView 
          ref={scrollViewRef} 
          style={styles.petCardsContainer}
        >
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              imageUrl={pet.imageUrl}
              name={pet.name}
              age={pet.age}
              location={pet.location}
              gender={pet.gender}
              isFavorite={pet.isFavorite}
              onFavoriteToggle={() => handleFavoriteToggle(pet.id)}
              favoriteIcon={IMAGES.ONCLICKFAV}
              unfavoriteIcon={IMAGES.OFCLICKFAV}
              locationIcon={IMAGES.LOCATION_VECTOR}
              onPress={() => handlePetPress(pet)}
            />
          ))}
        </ScrollView>
      )}

      <CustomBottomSheet 
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        selectedPet={selectedPet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 99,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  searchContainer: {
    top: 20,
  },
  tabsContainer: {
    marginTop: 25,
  },
  petCardsContainer: {
    marginTop: 20,
  },
});

export default SearchScreen;
