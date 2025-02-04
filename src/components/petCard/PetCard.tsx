import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PetCardProps } from '../../types/componentTypes';
import COLOR from '../../constant/constant';

const PetCard: React.FC<PetCardProps> = ({
  imageUrl,
  name,
  age,
  location,
  gender,
  deleteIcon,
  locationIcon,
  onPress,
}) => {
  return (
    // Make the entire card clickable by wrapping it in TouchableOpacity
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
        <View style={styles.infoCard}>
          <View style={styles.details}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.age}>{age}</Text>
            <View style={styles.locationRow}>
              <Image source={locationIcon} style={styles.locationIcon} />
              <Text style={styles.location}>{location}</Text>
            </View>
            <View style={styles.genderContainer}>
              <Text style={styles.gender}>{gender}</Text>
              <Image source={deleteIcon} style={styles.deleteIcon} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 171,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  imageContainer: {
    width: 194,
    height: 171,
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginLeft: -10,
    height: 126,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  details: {
    left: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.primary,
    marginBottom: 2,
  },
  age: {
    fontSize: 10,
    color: COLOR.primary,
    top: 2,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
    height: 30,
  },
  locationIcon: {
    width: 9,
    height: 13,
    marginRight: 4,
    tintColor: '#FF5A5F',
  },
  location: {
    fontSize: 14,
  },
  gender: {
    fontSize: 14,
    color: '#666666',
  },
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: 'red',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    width: 194,
    height: 171,
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
  },
});

export default PetCard;