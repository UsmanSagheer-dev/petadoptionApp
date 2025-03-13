import React from 'react';
import {View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../customButton/CustomButton';
import IMAGES from '../../assets/images/index';
import styles from './style';
import COLOR from '../../constants/constant';

const AdoptNowCard = ({data, onContactPress}) => {
  if (!data) {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>No adoption request data</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.profileData}>
        <Image
          source={
            data.ownerPhotoURL ? {uri: data.ownerPhotoURL} : IMAGES.PROFILEIMG
          }
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{data.ownerDisplayName}</Text>
          <Text style={styles.breed}>{data.petType}</Text>
          <Text style={styles.email}>{data.ownerEmail}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color={COLOR.error} />
            <Text style={styles.location}>{data.location}</Text>
          </View>
          <Text style={styles.date}>{data.formattedDate}</Text>
        </View>
      </View>
      <CustomButton
        title="Contact"
        onClick={() => onContactPress(data.ownerEmail)}
        backgroundColor="black"
        textColor="white"
        width="100%"
        height={36}
      />
    </View>
  );
};

export default AdoptNowCard;
