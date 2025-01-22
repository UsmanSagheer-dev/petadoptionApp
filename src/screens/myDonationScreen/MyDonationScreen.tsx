import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomeHeader from '../../components/customeHeader/CustomeHeader';
import PetCard from '../../components/petCard/PetCard';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import IMAGES from '../../assets/images/index';
import CustomBottomSheet from '../../components/petDetailsModal/PetDetailsModal';

const pets = [
  {
    id: '1',
    name: 'Cavachon',
    age: 'Age 4 Months',
    location: 'FSD',
    gender: 'Male',
    isFavorite: false,
    price: '250',
    vaccinated: 'Yes',
    description: 'Loving and playful Cavachon looking for a forever home. Very friendly with children and other pets.',
    ownerName: 'John Ryden',
  },
];

const MyDonationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);

  const handleFavoriteToggle = (petId: string) => {
    console.log(`Favorite toggled for pet: ${petId}`);
  };

  const handlePetClick = (pet: any) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <CustomeHeader title="My Donations" />
      <ScrollView style={styles.petCardsContainer}>
        {pets.map(pet => (
          <PetCard
            key={pet.id}
            name={pet.name}
            age={pet.age}
            location={pet.location}
            gender={pet.gender}
            isFavorite={pet.isFavorite}
            onFavoriteToggle={() => handleFavoriteToggle(pet.id)}
            favoriteIcon={IMAGES.DELETEICON}
            unfavoriteIcon={IMAGES.DELETEICON}
            locationIcon={IMAGES.LOCATION_VECTOR}
            onPress={() => handlePetClick(pet)} 
          />
        ))}
      </ScrollView>

      <CustomBottomSheet 
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
});

export default MyDonationScreen;
