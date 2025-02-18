import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {PetCardProps} from '../../types/componentTypes';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constant/constant';

const PetCard: React.FC<PetCardProps> = ({
  imageUrl,
  name,
  age,
  location,
  gender,
  icon,
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
              <MaterialIcons
                name="location-on"
                size={18}
                color={COLOR.PRIMARY_RED}
              />
              <Text style={styles.location}>{location}</Text>
            </View>
            <View style={styles.genderContainer}>
              <Text style={styles.gender}>{gender}</Text>
              <TouchableOpacity onPress={onIconPress}>
                 {icon}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PetCard;
