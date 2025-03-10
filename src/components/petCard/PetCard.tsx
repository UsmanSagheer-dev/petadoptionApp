import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { PetCardProps } from '../../types/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constants/constant';
import { styles } from './style';
import useImageSource from '../../hooks/useImageSource';

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
  const { getImageSource } = useImageSource();
  const imageSource = getImageSource(imageUrl);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="cover"
              onError={(error) =>
                console.warn('Image load error:', error.nativeEvent.error)
              }
            />
          ) : (
            <View style={styles.placeholder}>
              <Text>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
          <Text style={styles.age}>
            {age} {age === 1 ? 'year' : 'years'}
          </Text>
          <View style={styles.locationRow}>
            <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
              {location}
            </Text>
            <MaterialIcons name="location-on" size={18} color={COLOR.PRIMARY_RED} />
          </View>
          <View style={styles.genderContainer}>
            <Text style={styles.gender}>{gender}</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                onPress={onIconPress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <View>
                  <Text>{icon}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PetCard;
