import { useState, useEffect } from 'react';
import { Pet, FormDataState } from '../types/types';
import useFetchPets from './useFetchPets';

export const usePetSearch = (initialTab: string = 'Dogs') => {
  const [formData, setFormData] = useState<FormDataState>({
    selectedTab: initialTab,
    searchText: '',
    allPets: [],
  });

  const { pets, loading, error } = useFetchPets(formData.selectedTab);

  useEffect(() => {
    if (pets.length > 0) {
      setFormData(prevState => {
        const uniquePets = [...prevState.allPets, ...pets].filter(
          (pet, index, self) => index === self.findIndex(p => p.id === pet.id),
        );
        return {
          ...prevState,
          allPets: uniquePets,
        };
      });
    }
  }, [pets]);

  const handleTabPress = (tabId: string) => {
    setFormData(prevState => ({
      ...prevState,
      selectedTab: tabId,
      allPets: !prevState.searchText.trim() ? [] : prevState.allPets,
    }));
  };

  const handleSearchTextChange = (text: string) => {
    setFormData(prevState => ({
      ...prevState,
      searchText: text,
    }));
  };

  const filteredPets = formData.searchText.trim()
    ? formData.allPets.filter(
        pet =>
          pet.petBreed
            .toLowerCase()
            .includes(formData.searchText.toLowerCase()) ||
          pet.location
            .toLowerCase()
            .includes(formData.searchText.toLowerCase()) ||
          pet.gender.toLowerCase().includes(formData.searchText.toLowerCase()),
      )
    : pets;

  return {
    formData,
    loading,
    error,
    filteredPets,
    handleTabPress,
    handleSearchTextChange,
  };
};