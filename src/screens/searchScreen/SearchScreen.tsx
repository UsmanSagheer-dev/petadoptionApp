import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchInput from '../../components/searcInput/SearchInput';
import HorizontalTabs from '../../components/horizentolTabs/HorizentolTabs';
import PetCard from '../../components/petCard/PetCard';
import IMAGES from '../../assets/images/index';
import useFetchPets from '../../hooks/useFetchPets';
import { PET_TABS } from '../../constant/constant';
import { Pet } from '../../types/componentTypes';

type RootStackParamList = {
  Search: undefined;
  Detail: { pet: Pet };
};

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

const SearchScreen = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Dogs');
  const [searchText, setSearchText] = useState<string>('');
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const { pets, loading, error } = useFetchPets(selectedTab);
  const navigation = useNavigation<SearchScreenNavigationProp>();

  useEffect(() => {
    if (pets.length > 0) {
      setAllPets(prevPets => {
        const uniquePets = [...prevPets, ...pets].filter(
          (pet, index, self) => index === self.findIndex(p => p.id === pet.id)
        );
        return uniquePets;
      });
    }
  }, [pets]);

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
    if (!searchText.trim()) {
      setAllPets([]);
    }
  };

  const handlePetPress = (pet: Pet) => {
    navigation.navigate('Detail', { pet });
  };

  const filteredPets = searchText.trim()
    ? allPets.filter(pet =>
        pet.petBreed.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.location.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.gender.toLowerCase().includes(searchText.toLowerCase())
      )
    : pets;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
      </View>
      <View style={styles.tabsContainer}>
        <HorizontalTabs tabs={PET_TABS} onTabPress={handleTabPress} selectedTab={selectedTab} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView ref={scrollViewRef} style={styles.petCardsContainer}>
          {filteredPets.map(pet => (
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
              deleteIcon={IMAGES.OFCLICKFAV}
              locationIcon={IMAGES.LOCATION_VECTOR}
              onPress={() => handlePetPress(pet)}
            />
          ))}
        </ScrollView>
      )}
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
