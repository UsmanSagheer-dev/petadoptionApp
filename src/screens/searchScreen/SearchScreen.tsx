import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import SearchInput from '../../components/searcInput/SearchInput';
import HorizontalTabs from '../../components/horizentolTabs/HorizentolTabs';
import PetCard from '../../components/petCard/PetCard';
import IMAGES from '../../assets/images/index';

const SearchScreen = () => {
  const tabs = [
    { id: 'dogs', label: 'Dogs' },
    { id: 'cats', label: 'Cats' },
    { id: 'bunnies', label: 'Bunnies' },
    { id: 'birds', label: 'Birds' },
    { id: 'turtles', label: 'Turtles' },
  ];

  const pets = [
    {
      id: '1',
      name: 'Cavachon',
      age: 'Age 4 Months',
      location: 'FSD',
      gender: 'Male',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Persian Cat',
      age: 'Age 2 Months',
      location: 'LHR',
      gender: 'Female',
      isFavorite: true,
    },
  ];

  const handleTabPress = (tabId: string) => {
    console.log(`Selected Tab: ${tabId}`);
  };

  const handleFavoriteToggle = (petId: string) => {
    console.log(`Favorite toggled for pet: ${petId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput />
      </View>
      <View style={styles.tabsContainer}>
        <HorizontalTabs tabs={tabs} onTabPress={handleTabPress} />
      </View>
      <ScrollView style={styles.petCardsContainer}>
        {pets.map((pet) => (
          <PetCard
          key={pet.id}
          name={pet.name}
          age={pet.age}
          location={pet.location}
          gender={pet.gender}
          isFavorite={pet.isFavorite}
          onFavoriteToggle={() => handleFavoriteToggle(pet.id)}
          favoriteIcon={IMAGES.ONCLICKFAV}
          unfavoriteIcon={IMAGES.OFCLICKFAV}
          locationIcon={IMAGES.LOCATION_VECTOR}
        />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
