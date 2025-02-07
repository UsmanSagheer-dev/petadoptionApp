import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {PetCardProps} from '../../types/componentTypes';
import COLOR from '../../constant/constant';

const PetCard: React.FC<PetCardProps> = ({
  imageUrl,
  name,
  age,
  location,
  gender,
  icon, // 'icon' instead of 'favoriteIcon'
  locationIcon,
  onPress,
  onIconPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} style={styles.image} />
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
              <View style={styles.genderContainer}>
                <TouchableOpacity onPress={onIconPress}>
                  <Image source={icon} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
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
    borderRadius: 10, // Thoda smooth look dene ke liye
   
},

  imageContainer: {
   width:200,
    // height: ,
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
    // overflow: 'hidden',
    zIndex: 999,
   
  },
  image: {
    // width: '100%',
    height: '100%',
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Shadow ko neeche shift karne ke liye
    shadowOpacity: 5, // Shadow ki intensity
    shadowRadius: 6, // Blur effect
    elevation: 8, // Android ke liye shado
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20, // Yeh puri card ke liye radius hai
    borderTopRightRadius:20,  // Sirf top left ke liye
    borderBottomRightRadius: 20,  // Sirf bottom left ke liye
    padding: 12,
    marginLeft: -10,
    height: 126,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  placeholder: {
    width: 194,
    height: 171,
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
  },
});

export default PetCard;
