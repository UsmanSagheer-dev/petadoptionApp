import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React from 'react';
import CustomeHeader from '../../components/customeHeader/CustomeHeader';
import PetCard from '../../components/petCard/PetCard';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import useFavorites from '../../hooks/useFavourite';
import IMAGES from '../../assets/images/index';
import COLOR from '../../constant/constant';
import ICONS from '../../constant/icons';
import styles from './FavouriteScreenStyle';
const FavouriteScreen = () => {
  const {
    favorites,
    selectedPet,
    isModalVisible,
    handlePetClick,
    toggleFavorite,
    closeModal,
    loading,
  } = useFavorites();

  return (
    <View style={styles.container}>
      <CustomeHeader title="Favourite Screen" />
      {loading ? (
        <ActivityIndicator size="large" color={COLOR.primary} />
      ) : favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites found</Text>
      ) : (
        <ScrollView style={styles.petCardsContainer}>
          {favorites.map(pet => (
            <PetCard
              key={pet.id}
              imageUrl={pet.imageUrl}
              name={pet.petBreed}
              age={pet.age}
              location={pet.location}
              gender={pet.gender}
              icon={pet.isFavorite ? ICONS.ONCLICKFAV() : ICONS.OFCLICKFAV()}
              locationIcon={IMAGES.LOCATION_VECTOR}
              onPress={() => handlePetClick(pet)}
              onIconPress={() => toggleFavorite(pet)}
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
