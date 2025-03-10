import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import PetCard from '../../components/petCard/PetCard';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import useFavorites from '../../hooks/useFavourite';
import IMAGES from '../../assets/images/index';
import COLOR from '../../constants/constant';
import ICONS from '../../constants/icons';
import styles from './style';
import AppBar from '../../components/appBar/AppBar';
import Toast from 'react-native-toast-message';

const FavouriteScreen = () => {
  const {
    favorites,
    selectedPet,
    isModalVisible,
    handlePetClick,
    toggleFavorite,
    closeModal,
    loading,
    error,
    noFavoritesMessage,
  } = useFavorites();

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Favorites Error',
        text2: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (noFavoritesMessage && !loading) {
      Toast.show({
        type: 'info',
        text1: 'Favorites',
        text2: noFavoritesMessage,
      });
    }
  }, [noFavoritesMessage, loading]);

  const handleToggleFavorite = (pet: any) => {
    toggleFavorite(pet);
    Toast.show({
      type: pet?.isFavorite ? 'success' : 'info',
      text1: pet?.isFavorite
        ? `${pet?.petBreed ?? 'Pet'} removed from favorites`
        : `${pet?.petBreed ?? 'Pet'} added to favorites`,
    });
  };

  return (
    <View style={styles.container}>
      <AppBar title="Favourite" navigateTo="SearchScreen" />
      {loading ? (
        <ActivityIndicator size="large" color={COLOR.primary} />
      ) : error ? (
        <Text style={styles.noFavoritesText}>Error: {error}</Text>
      ) : favorites?.length === 0 ? (
        <Text style={styles.noFavoritesText}>{noFavoritesMessage}</Text>
      ) : (
        <ScrollView style={styles.petCardsContainer}>
          {favorites?.map(pet => (
            <PetCard
              key={pet?.id}
              imageUrl={pet?.imageUrl ?? IMAGES.DELETEICON}
              name={pet?.petBreed ?? 'Unknown Breed'}
              age={pet?.petAge ?? 'N/A'}
              location={pet?.location ?? 'Unknown Location'}
              gender={pet?.gender ?? 'N/A'}
              icon={pet?.isFavorite ? ICONS.ONCLICKFAV() : ICONS.OFCLICKFAV()}
              locationIcon={IMAGES.LOCATION_VECTOR}
              onPress={() => handlePetClick(pet)}
              onIconPress={() => handleToggleFavorite(pet)}
            />
          ))}
        </ScrollView>
      )}
      <PetDetailsModal
        isVisible={isModalVisible}
        onClose={closeModal}
        selectedPet={selectedPet}
      />
    </View>
  );
};

export default FavouriteScreen;
