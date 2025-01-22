import COLOR from '../../constant/constant';
import IMAGES from '../../assets/images/index';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {PetCardProps} from '../../types/componentTypes'

const PetCard: React.FC<PetCardProps> = ({
  imageUrl,
  name,
  age,
  location,
  gender,
  isFavorite,
  onFavoriteToggle,
  favoriteIcon,
  unfavoriteIcon,
  locationIcon,
}) => {
  return (
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
          <Text style={styles.age}> {age}</Text>
          <View style={styles.locationRow}>
            <Text style={styles.location}>{location}</Text>
            <Image source={locationIcon} style={styles.locationIcon} />
          </View>
          <View style={styles.genderContainer}>
            <Text style={styles.gender}>{gender}</Text>
            <TouchableOpacity onPress={onFavoriteToggle} style={styles.heartButton}>
              <Image
                source={isFavorite ? favoriteIcon : unfavoriteIcon}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
    marginBottom:12,
  },
  imageContainer: {
    width: 194,
    height: 171,
    backgroundColor:'#C4C4C4',
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {},
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginLeft: -10,
    height: 126,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 4,
    shadowRadius: 8,
    elevation: 3,
  },
  details: {
    left: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
    marginBottom: 2,
  },
  age: {
    fontSize: 10,
    color: COLOR.primary,
    top: 2,
    fontWeight: 500,
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
  heartButton: {},
  heartIcon: {
    width: 20,
    height: 20,
    // tintColor: '#FF5A5F',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 50,
    alignItems: 'center',
  },
});

export default PetCard;
