import React from 'react';
import {View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../customButton/CustomButton';
import IMAGES from '../../assets/images/index';
import styles from './style';
import {useAdoptNowCard} from './useAdoptNowCard';
import COLOR from '../../constants/constant';

const AdoptNowCard = () => {
  const {cardData, handleContactPress} = useAdoptNowCard();

  if (!cardData.hasData) {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>No adoption requests found</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.profileData}>
        <Image
          source={
            cardData.ownerPhotoURL
              ? {uri: cardData.ownerPhotoURL}
              : IMAGES.PROFILEIMG
          }
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{cardData.ownerDisplayName}</Text>
          <Text style={styles.breed}>{cardData.petType}</Text>
          <Text style={styles.email}>{cardData.ownerEmail}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color={COLOR.error} />
            <Text style={styles.location}>{cardData.location}</Text>
          </View>
          <Text style={styles.date}>{cardData.formattedDate}</Text>
        </View>
      </View>
      <CustomButton
        title="Contact"
        onClick={handleContactPress}
        backgroundColor="black"
        textColor="white"
        width="100%"
        height={36}
      />
    </View>
  );
};

export default AdoptNowCard;
