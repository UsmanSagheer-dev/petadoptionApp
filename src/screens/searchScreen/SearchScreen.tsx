// screens/SearchScreen.tsx
import React, {useRef} from 'react';
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import SearchInput from '../../components/searcInput/SearchInput';
import HorizontalTabs from '../../components/horizentolTabs/HorizentolTabs';
import PetCard from '../../components/petCard/PetCard';
import IMAGES from '../../assets/images/index';
import {PET_TABS} from '../../constants/constant';
import {Pet, SearchScreenNavigationProp} from '../../types/types';
import {toggleFavoriteStatus} from '../../redux/slices/petSlice';
import ICONS from '../../constants/icons';
import styles from './style';
import {usePetSearch} from '../../hooks/usePetSearch';

const SearchScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    formData,
    loading,
    error,
    filteredPets,
    handleTabPress,
    handleSearchTextChange,
  } = usePetSearch();

  const handlePetPress = (pet: Pet) => {
    navigation.navigate('Detail', {pet});
  };

  const handleFavoriteToggle = async (pet: Pet) => {
    try {
      await dispatch(toggleFavoriteStatus(pet)).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

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
              imageUrl={pet?.imageUrl}
              name={pet?.petBreed}
              age={pet?.petAge}
              location={pet?.location}
              gender={pet?.gender}
              icon={pet.isFavorite ? ICONS.ONCLICKFAV() : ICONS.OFCLICKFAV()}
              locationIcon={IMAGES?.LOCATION_VECTOR}
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
