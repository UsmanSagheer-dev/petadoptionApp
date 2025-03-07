import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './hooks';
import {fetchFavorites, toggleFavoriteStatus} from '../redux/slices/petSlice';
import {pet} from '../types/types';

const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.pet.favorites);
  const loadingState = useAppSelector(state => state.pet.loading);
  const error = useAppSelector(state => state.pet.error);
  const [selectedPet, setSelectedPet] = useState<pet | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [togglingPets, setTogglingPets] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLocalLoading(true);
    dispatch(fetchFavorites())
      .unwrap()
      .catch(err => console.error('Failed to fetch favorites:', err))
      .finally(() => setLocalLoading(false));
  }, [dispatch]);

  const toggleFavorite = async (petItem: pet) => {
    try {
      setTogglingPets(prev => new Set(prev).add(petItem.id));

      const result = await dispatch(toggleFavoriteStatus(petItem)).unwrap();
      console.log('Toggle result:', result);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setTogglingPets(prev => {
        const newSet = new Set(prev);
        newSet.delete(petItem.id);
        return newSet;
      });
    }
  };

  const handlePetClick = (petItem: pet) => {
    setSelectedPet(petItem);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPet(null);
  };

  const isLoading = (loadingState && !togglingPets.size) || localLoading;

  return {
    favorites,
    selectedPet,
    isModalVisible,
    loading: isLoading,
    togglingPets,
    error,
    noFavoritesMessage:
      favorites.length === 0 && !isLoading ? 'No favorites found' : '',
    handlePetClick,
    toggleFavorite,
    closeModal,
  };
};

export default useFavorites;
