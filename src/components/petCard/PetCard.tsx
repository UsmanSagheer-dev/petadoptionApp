import IMAGES from '../../assets/images/index';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface PetCardProps {
  imageUrl?: string;
  name: string;
  age: string;
  location: string;
  gender: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  locationIcon: string; // Custom location icon
  favoriteIcon: string; // Custom favorite icon
  unfavoriteIcon: string; // Custom unfavorite icon
}

const PetCard: React.FC<PetCardProps> = ({
  imageUrl,
  name,
  age,
  location,
  gender,
  isFavorite,
  onFavoriteToggle,
  locationIcon,
  favoriteIcon,
  unfavoriteIcon,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={IMAGES.PETCARDIMG} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.age}>{age}</Text>
        <View style={styles.locationContainer}>
          <Image source={{ uri: locationIcon }} style={styles.icon} />
          <Text style={styles.location}>{location}</Text>
        </View>
        <Text style={styles.gender}>{gender}</Text>
      </View>
      <TouchableOpacity onPress={onFavoriteToggle} style={styles.favoriteIcon}>
      <Image
          source={isFavorite ? IMAGES.ONCLICKFAV : IMAGES.OFCLICKFAV}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#C0C0C0',
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  age: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  gender: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  favoriteIcon: {
    padding: 8,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 4, // Space for the location text
  },
});

export default PetCard;
