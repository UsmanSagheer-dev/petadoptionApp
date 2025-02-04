import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import CustomeHeader from '../../components/customeHeader/CustomeHeader';
import PetCard from '../../components/petCard/PetCard';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import IMAGES from '../../assets/images/index';
import useFetchAllPets from '../../hooks/useFetchAllPets';

const MyDonationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const { pets, loading, error, deletePet } = useFetchAllPets(); // Assuming deletePet function exists in your hook

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const handleDelete = (petId) => {
    Alert.alert(
      "Delete Donation",
      "Are you sure you want to delete this donation?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePet(petId); // Call your delete API function
              // The pets list should automatically update if you're using proper state management
            } catch (error) {
              Alert.alert("Error", "Failed to delete the donation. Please try again.");
            }
          }
        }
      ]
    );
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
                onDelete={() => handleDelete(pet.id)} // Add this new prop
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
