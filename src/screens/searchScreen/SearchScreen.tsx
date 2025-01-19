import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import SearchInput from '../../components/searcInput/SearchInput';
import HorizontalTabs from '../../components/horizentolTabs/HorizentolTabs';
import PetCard from '../../components/petCard/PetCard'; // Import PetCard

const SearchScreen = () => {
  const tabs = [
    {id: 'dogs', label: 'Dogs'},
    {id: 'cats', label: 'Cats'},
    {id: 'bunnies', label: 'Bunnies'},
    {id: 'birds', label: 'Birds'},
    {id: 'turtles', label: 'Turtles'},
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
        <PetCard
          name="Cavachon"
          age="Age 4 Months"
          location="FSD"
          gender="Male"
          isFavorite={false}
          onFavoriteToggle={() => handleFavoriteToggle('1')}
          imageUrl="https://example.com/pet-image.jpg"
          locationIcon="https://example.com/location-icon.png"
          favoriteIcon="https://example.com/favorite-icon.png"
          unfavoriteIcon="https://example.com/unfavorite-icon.png"
        />
        <PetCard
          name="Persian Cat"
          age="Age 2 Months"
          location="LHR"
          gender="Female"
          isFavorite={true}
          onFavoriteToggle={() => handleFavoriteToggle('2')}
          imageUrl="https://example.com/cat-image.jpg"
          locationIcon="https://example.com/location-icon.png"
          favoriteIcon="https://example.com/favorite-icon.png"
          unfavoriteIcon="https://example.com/unfavorite-icon.png"
        />
        {/* Add more PetCard components as needed */}
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
