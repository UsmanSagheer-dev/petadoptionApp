import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import useFavorites from '../../hooks/useFavourite';
import {usePetDetails} from '../../hooks/usePetDetails';

const useFavouriteScreen = () => {
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

  const {profileData, handleAdoptNow} = usePetDetails(selectedPet);

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

  const handleToggleFavorite = pet => {
    toggleFavorite(pet);
  };

  return {
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
  };
};

export default useFavouriteScreen;
