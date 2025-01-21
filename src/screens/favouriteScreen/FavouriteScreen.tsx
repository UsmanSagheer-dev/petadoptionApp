import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Alert } from 'react-native';
import React from 'react';
import COLOR from '../../constant/constant';
import PetCard from '../../components/petCard/PetCard';
import CustomeHeader from '../../components/customeHeader/CustomeHeader';

const pets = [
  {
    id: '1',
    name: 'Cavachon',
    age: 'Age 4 Months',
    location: 'FSD',
    gender: 'Male',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Persian Cat',
    age: 'Age 2 Months',
    location: 'LHR',
    gender: 'Female',
    isFavorite: true,
  },
];

const handleFavoriteToggle = (petId: string) => {
  console.log(`Favorite toggled for pet: ${petId}`);
};

const FavouriteScreen = () => {
  return (
    <View style={styles.container}>
     
     <CustomeHeader 
  title="Favourite Screen" 
  onPress={() => Alert.alert('Plus button clicked!')} 
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
            onFavoriteToggle={() => handleFavoriteToggle(pet.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    flex: 1,
    backgroundColor: COLOR.white,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  plus: {
    fontSize: 36,
    fontWeight: '500',
    color: COLOR.primary,
  },
  petCardsContainer: {
    marginTop: 20,
  },
});

export default FavouriteScreen;
