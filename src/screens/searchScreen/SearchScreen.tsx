import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import SearchInput from '../../components/searcInput/SearchInput';
import HorizontalTabs from '../../components/horizentolTabs/HorizentolTabs';
import PetCard from '../../components/petCard/PetCard';
import CustomBottomSheet from '../../components/petDetailsModal/PetDetailsModal';
import IMAGES from '../../assets/images/index';
import useFetchPets from '../../hooks/useFetchPets';

const SearchScreen = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedTab, setSelectedTab] = useState<string>('Dogs');
  const scrollViewRef = useRef<ScrollView>(null);

  const { pets, loading, error } = useFetchPets(selectedTab);

  const tabs = [
    { id: 'Dogs', label: 'Dogs' },
    { id: 'Cats', label: 'Cats' },
    { id: 'Bunnies', label: 'Bunnies' },
    { id: 'Birds', label: 'Birds' },
    { id: 'Turtles', label: 'Turtles' },
  ];

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const handlePetPress = (pet: any) => {
    console.log("Selected Pet Data:", JSON.stringify(pet, null, 2)); // Logs pet data in formatted JSON
    setSelectedPet(pet);
    setIsBottomSheetVisible(true);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput />
      </View>
      <View style={styles.tabsContainer}>
        <HorizontalTabs tabs={tabs} onTabPress={handleTabPress} selectedTab={selectedTab} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView ref={scrollViewRef} style={styles.petCardsContainer}>
          {pets.map(pet => (
            <PetCard
              key={pet.id}
              imageUrl={pet.imageUrl}
              name={pet.petBreed}
              age={pet.amount}
              location={pet.location}
              gender={pet.gender}
              isFavorite={pet.isFavorite}
              onFavoriteToggle={() => {}}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
