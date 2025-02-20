import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import CustomeHeader from '../../components/customeHeader/CustomeHeader';
import PetCard from '../../components/petCard/PetCard';
import IMAGES from '../../assets/images/index';
import useFetchAllPets from '../../hooks/useFetchAllPets';
import { AppStackParamList } from '../../types/navigation';
import ICONS from '../../constant/icons';

type MyDonationScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<AppStackParamList, 'MyDonationScreen'>,
  NativeStackNavigationProp<AppStackParamList>
>;

const MyDonationScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { pets, loading, error, deletePet } = useFetchAllPets();
  const navigation = useNavigation<MyDonationScreenNavigationProp>();

  const handlePetClick = (pet) => {
    navigation.navigate('Detail', {
      id: pet.id,
      name: pet.name,
      pet, 
    });
  };
  

  const handleDeletePet = (petId: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this pet?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deletePet(petId), style: 'destructive' },
      ],
    );
  };
  console.log('Pet data:', pets[0]?.imageUrl);
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
            pets.map(pet => (
              <View key={pet.id} style={styles.petCardWrapper}>
                <PetCard
                   imageUrl={pet.imageUrl}
                  name={pet.petBreed}
                  age={pet.petAge}
                  location={pet.location}
                  gender={pet.gender}
                  icon={ICONS.delete()} 
                  locationIcon={IMAGES.LOCATION_VECTOR}
                  onPress={() => handlePetClick(pet)} 
                  onIconPress={() => handleDeletePet(pet.id)} 
                />
              </View>
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
  petCardWrapper: {
    
  },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  noDataText: { textAlign: 'center', fontSize: 16, color: '#555', marginTop: 20 },
});

export default MyDonationScreen;
