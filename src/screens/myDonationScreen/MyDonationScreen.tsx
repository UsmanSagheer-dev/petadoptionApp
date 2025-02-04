import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import CustomeHeader from '../../components/customeHeader/CustomeHeader';
import PetCard from '../../components/petCard/PetCard';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import IMAGES from '../../assets/images/index';
import useFetchAllPets from '../../hooks/useFetchAllPets';  // 🔹 Import new hook

const MyDonationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Saare pets fetch karne wala hook
  const { pets, loading, error } = useFetchAllPets(); 

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <CustomeHeader title="My Donations" />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView ref={scrollViewRef} style={styles.petCardsContainer}>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <PetCard
                key={pet.id}
                imageUrl={pet.imageUrl}
                name={pet.petBreed}
                age={pet.amount}
                location={pet.location}
                gender={pet.gender}
                isFavorite={pet.isFavorite}
                onFavoriteToggle={() => {}}
                favoriteIcon={IMAGES.DELETEICON}
                deleteIcon={IMAGES.DELETEICON}
                locationIcon={IMAGES.LOCATION_VECTOR}
                onPress={() => handlePetClick(pet)}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>No donations found.</Text>
          )}
        </ScrollView>
      )}

      <PetDetailsModal 
        isVisible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        selectedPet={selectedPet} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  petCardsContainer: {
    padding: 15,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
});

export default MyDonationScreen;
