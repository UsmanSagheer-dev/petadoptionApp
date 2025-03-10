import React, {useRef} from 'react';
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import PetCard from '../../components/petCard/PetCard';
import IMAGES from '../../assets/images/index';
import useFetchAllPets from '../../hooks/useFetchAllPets';
import {AppStackParamList} from '../../types/types';
import ICONS from '../../constants/icons';
import styles from './style';
import AppBar from '../../components/appBar/AppBar';
import Toast from 'react-native-toast-message';

type MyDonationScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<AppStackParamList, 'MyDonationScreen'>,
  NativeStackNavigationProp<AppStackParamList>
>;

const MyDonationScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const {pets, loading, error, deletePet} = useFetchAllPets();
  const navigation = useNavigation<MyDonationScreenNavigationProp>();

  const handlePetClick = (pet: any) => {
    navigation.navigate('Detail', {
      id: pet.id,
      name: pet.name,
      pet,
    });
  };

  const handleDeletePet = async (petId: string) => {
    Toast.show({
      type: 'info',
      text1: 'Deleting Pet...',
      text2: 'Please wait while we remove the pet.',
    });

    try {
      await deletePet(petId);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Pet deleted successfully!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete pet. Please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppBar title="Donation Screen" navigateTo="Donate" />
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
                  imageUrl={pet?.imageUrl}
                  name={pet?.petBreed}
                  age={pet?.petAge}
                  location={pet?.location}
                  gender={pet?.gender}
                  icon={ICONS?.delete()}
                  locationIcon={IMAGES?.LOCATION_VECTOR}
                  onPress={() => handlePetClick(pet)}
                  onIconPress={() => handleDeletePet(pet?.id)}
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

export default MyDonationScreen;
