import React, { useRef } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation'; // 🟢 Import Navigation Types
import CustomeHeader from '../../components/customeHeader/CustomeHeader';
import PetCard from '../../components/petCard/PetCard';
import IMAGES from '../../assets/images/index';
import useFetchAllPets from '../../hooks/useFetchAllPets';

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyDonationScreen'>;

const MyDonationScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProp>();
  const { pets, loading, error, deletePet } = useFetchAllPets(); 

  const handlePetClick = (pet: any) => {
    navigation.navigate('Detail', { pet });  // ✅ Fix Type Issue
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
              favoriteIcon={IMAGES.ONCLICKFAV}
              deleteIcon={IMAGES.OFCLICKFAV}
              locationIcon={IMAGES.LOCATION_VECTOR}
              onPress={() => handlePetClick(pet)} 
            />
            ))
          ) : (
            <Text style={styles.noDataText}>No donations found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  petCardsContainer: { padding: 15 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  noDataText: { textAlign: 'center', fontSize: 16, color: '#555', marginTop: 20 },
});

export default MyDonationScreen;
