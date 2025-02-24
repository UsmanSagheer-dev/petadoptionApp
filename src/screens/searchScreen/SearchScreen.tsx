import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import SearchInput from '../../components/searcInput/SearchInput';
import HorizontalTabs from '../../components/horizentolTabs/HorizentolTabs';
import PetCard from '../../components/petCard/PetCard';
import IMAGES from '../../assets/images/index';
import useFetchPets from '../../hooks/useFetchPets';
import {PET_TABS} from '../../constant/constant';
import {Pet} from '../../types/types';
import {toggleFavoriteStatus} from '../../redux/slices/favoritesSlice';
import ICONS from '../../constant/icons';
import styles from './SearchScreenStyle';
import {SearchScreenNavigationProp} from '../../types/types';

interface FormDataState {
  selectedTab: string;
  searchText: string;
  allPets: Pet[];
}

const SearchScreen = () => {
  const [formData, setFormData] = useState<FormDataState>({
    selectedTab: 'Dogs',
    searchText: '',
    allPets: [],
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const {pets, loading, error} = useFetchPets(formData.selectedTab);
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (pets.length > 0) {
      setFormData(prevState => {
        const uniquePets = [...prevState.allPets, ...pets].filter(
          (pet, index, self) => index === self.findIndex(p => p.id === pet.id),
        );
        return {
          ...prevState,
          allPets: uniquePets,
        };
      });
    }
  }, [pets]);

  const handleTabPress = (tabId: string) => {
    setFormData(prevState => ({
      ...prevState,
      selectedTab: tabId,
      allPets: !prevState.searchText.trim() ? [] : prevState.allPets,
    }));
  };

  const handleSearchTextChange = (text: string) => {
    setFormData(prevState => ({
      ...prevState,
      searchText: text,
    }));
  };

  const handlePetPress = (pet: Pet) => {
    navigation.navigate('Detail', {pet});
  };

  const handleFavoriteToggle = async (pet: Pet) => {
    try {
      await dispatch(toggleFavoriteStatus(pet)).unwrap();
      setFormData(prevState => ({
        ...prevState,
        allPets: prevState.allPets.map(p =>
          p.id === pet.id ? {...p, isFavorite: !p.isFavorite} : p,
        ),
      }));
    } catch (error) {
      console.error(' Failed to toggle favorite:', error);
    }
  };

  const filteredPets = formData.searchText.trim()
    ? formData.allPets.filter(
        pet =>
          pet.petBreed
            .toLowerCase()
            .includes(formData.searchText.toLowerCase()) ||
          pet.location
            .toLowerCase()
            .includes(formData.searchText.toLowerCase()) ||
          pet.gender.toLowerCase().includes(formData.searchText.toLowerCase()),
      )
    : pets;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput
          searchText={formData.searchText}
          setSearchText={handleSearchTextChange}
        />
      </View>
      <View style={styles.tabsContainer}>
        <HorizontalTabs
          tabs={PET_TABS}
          onTabPress={handleTabPress}
          selectedTab={formData.selectedTab}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredPets.length === 0 ? (
        <Text style={styles.notFoundText}>Not Found</Text>
      ) : (
        <ScrollView ref={scrollViewRef} style={styles.petCardsContainer}>
          {filteredPets.map(pet => (
            <PetCard
              key={pet.id}
              imageUrl={pet.imageUrl}
              name={pet.petBreed}
              age={pet.age}
              location={pet.location}
              gender={pet.gender}
              icon={pet.isFavorite ? ICONS.ONCLICKFAV() : ICONS.OFCLICKFAV()}
              locationIcon={IMAGES.LOCATION_VECTOR}
              onPress={() => handlePetPress(pet)}
              onIconPress={() => handleFavoriteToggle(pet)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchScreen;
