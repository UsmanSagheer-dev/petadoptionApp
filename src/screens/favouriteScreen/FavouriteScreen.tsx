import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import PetCard from '../../components/petCard/PetCard';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import useFavouriteScreen from './hook';
import IMAGES from '../../assets/images/index';
import COLOR from '../../constants/constant';
import ICONS from '../../constants/icons';
import styles from './style';
import AppBar from '../../components/appBar/AppBar';

const FavouriteScreen = () => {
  const {
    favorites,
    selectedPet,
    isModalVisible,
    handlePetClick,
    handleToggleFavorite,
    closeModal,
    loading,
    error,
    noFavoritesMessage,
    profileData,
    handleAdoptNow,
  } = useFavouriteScreen();

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
          {favorites?.map((pet) => (
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
        ownerData={profileData}
        onAdoptNow={handleAdoptNow}
      />
    </View>
  );
};

export default FavouriteScreen;