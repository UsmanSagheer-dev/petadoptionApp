import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React from 'react';
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
  } = useFavorites();

  const handleToggleFavorite = (pet: any) => {
    toggleFavorite(pet);
    Toast.show({
      type: pet.isFavorite ? 'success' : 'info',
      text1: pet.isFavorite
        ? `${pet.petBreed} removed from favorites`
        : `${pet.petBreed} added to favorites`,
    });
  };

  return (
    <View style={styles.container}>
      <AppBar title="Favourite" navigateTo="SearchScreen" />
      {loading ? (
        <ActivityIndicator size="large" color={COLOR.primary} />
      ) : error ? (
        <Text style={styles.noFavoritesText}>Error: {error}</Text>
      ) : favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites found</Text>
      ) : (
        <ScrollView style={styles.petCardsContainer}>
          {favorites.map(pet => (
            <PetCard
              key={pet.id}
              imageUrl={pet.imageUrl}
              name={pet.petBreed}
              age={pet.petAge}
              location={pet.location}
              gender={pet.gender}
              icon={pet.isFavorite ? ICONS.ONCLICKFAV() : ICONS.OFCLICKFAV()}
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
