import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchFavorites, toggleFavoriteStatus } from '../redux/slices/petSlice';
import { Pet } from '../types/types'; // Assuming 'Pet' is the correct type

const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.pet.favorites);
  const loadingState = useAppSelector((state) => state.pet.loading);
  const error = useAppSelector((state) => state.pet.error);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [togglingPets, setTogglingPets] = useState<Set<string>>(new Set());
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [toggleError, setToggleError] = useState<string | null>(null);

  useEffect(() => {
    setLocalLoading(true);
    dispatch(fetchFavorites())
      .unwrap()
      .catch((err: any) => setFetchError(err.message || 'Failed to fetch favorites'))
      .finally(() => setLocalLoading(false));
  }, [dispatch]);

  const toggleFavorite = async (petItem: Pet) => {
    try {
      setTogglingPets((prev) => new Set(prev).add(petItem.id));
      await dispatch(toggleFavoriteStatus(petItem)).unwrap();
    } catch (err: any) {
      setToggleError(err.message || 'Failed to toggle favorite');
    } finally {
      setTogglingPets((prev) => {
        const newSet = new Set(prev);
        newSet.delete(petItem.id);
        return newSet;
      });
    }
  };

  const handlePetClick = (petItem: Pet) => {
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
    fetchError, 
    toggleError, 
    noFavoritesMessage:
      favorites.length === 0 && !isLoading ? 'No favorites found' : '',
    handlePetClick,
    toggleFavorite,
    closeModal,
  };
};

export default useFavorites;