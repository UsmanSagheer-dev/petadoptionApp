import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import COLOR from '../../constant/constant';
import PetCard from '../../components/petCard/PetCard';
import CustomeHeader from '../../components/customeHeader/CustomeHeader';
import IMAGES from '../../assets/images/index';
import CustomBottomSheet from '../../components/petDetailsModal/PetDetailsModal';

const pets = [
  {
    id: '1',
    name: 'Cavachon',
    age: '4 Months',
    location: 'FSD',
    gender: 'Male',
    weight: '5 kg',
    vaccinated: true,
    price: '200',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Persian Cat',
    age: '2 Months',
    location: 'LHR',
    gender: 'Female',
    weight: '3 kg',
    vaccinated: false,
    price: '300',
    isFavorite: true,
  },
];

const FavouriteScreen = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePetClick = (pet: any) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <CustomeHeader 
        title="Favourite Screen" 
    
      />

      <ScrollView style={styles.petCardsContainer}>
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            name={pet.name}
            age={pet.age}
            location={pet.location}
            gender={pet.gender}
            isFavorite={pet.isFavorite}
            onFavoriteToggle={() => console.log(`Favorite toggled for pet: ${pet.id}`)}
            onPress={() => handlePetClick(pet)} 
            favoriteIcon={IMAGES.ONCLICKFAV}
            unfavoriteIcon={IMAGES.OFCLICKFAV}
            locationIcon={IMAGES.LOCATION_VECTOR}
          />
        ))}
      </ScrollView>

      <CustomBottomSheet 
        isVisible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        selectedPet={selectedPet} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    flex: 1,
    backgroundColor: COLOR.white,
  },
  petCardsContainer: {
    marginTop: 20,
  },
});

export default FavouriteScreen;
