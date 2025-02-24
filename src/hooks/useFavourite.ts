import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './hooks';
import {
  fetchFavorites,
  toggleFavoriteStatus,
} from '../redux/slices/favoritesSlice';
import {Pet} from '../types/types';
const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.favorites);
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
    noFavoritesMessage:
      favorites.length === 0 && !loading ? 'No favorites found' : '',
    handlePetClick,
    toggleFavorite,
    closeModal: () => setModalVisible(false),
  };
};

export default useFavorites;
