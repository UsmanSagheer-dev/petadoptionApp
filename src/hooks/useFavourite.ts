import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchFavorites, toggleFavoriteStatus } from '../redux/slices/favoritesSlice';
import { Pet } from '../types/componentTypes';

const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchFavorites()).finally(() => setLoading(false));
  }, [dispatch]);

  const handlePetClick = (pet: Pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const toggleFavorite = (pet: Pet) => {
    dispatch(toggleFavoriteStatus(pet));
  };

  return {
    favorites,
    selectedPet,
    isModalVisible,
    loading,
    noFavoritesMessage: favorites.length === 0 && !loading ? 'No favorites found' : '',
    handlePetClick,
    toggleFavorite,
    closeModal: () => setModalVisible(false),
  };
};

export default useFavorites;