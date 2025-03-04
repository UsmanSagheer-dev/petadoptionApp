import React from 'react';
import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import {useCustomBottomSheet} from '../../hooks/useCustomBottomSheet';
import {CustomBottomSheetProps} from '../../types/types';
import IMAGES from '../../assets/images';
import {usePetDetails} from '../../hooks/usePetDetails';
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constant/constant';
import CustomButton from '../../components/customButton/CustomButton';

const PetDetailsModal: React.FC<CustomBottomSheetProps> = ({
  isVisible,
  onClose,
  selectedPet,
}) => {
  const {translateY} = useCustomBottomSheet(isVisible);
  const {profileData, handleAdoptNow} = usePetDetails(selectedPet);

  if (!selectedPet) return null;

  const petInfoItems = [
    {label: 'Age', value: selectedPet.petAge},
    {label: 'Gender', value: selectedPet.gender},
    {label: 'Weight', value: selectedPet.minWeight},
    {label: 'Vaccine', value: selectedPet.vaccinated ? 'Yes' : 'No'},
  ];

  return (
    <Animated.View style={[styles.overlay, {transform: [{translateY}]}]}>
      <View style={styles.bottomSheet}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <View style={styles.handle} />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>{selectedPet?.petBreed}</Text>
          <Text style={styles.price}>${selectedPet?.amount}</Text>
        </View>

        <View style={styles.typeContainer}>
          <Text style={styles.type}>{selectedPet?.petType}</Text>
        </View>

        <View style={styles.infoContainer}>
          {petInfoItems?.map((item, index) => (
            <View key={index} style={styles.infoBox}>
              <Text style={styles.labelTitle}>{item.label}</Text>
              <Text style={styles.labelSub}>{item?.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileSet}>
            <TouchableOpacity>
              <Image
                source={
                  profileData?.photoURL
                    ? {uri: profileData?.photoURL}
                    : IMAGES.PROFILEIMG
                }
                style={styles.profile}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.userName}>{profileData?.displayName}</Text>
              <Text style={styles.subtitle}>Owner</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <MaterialIcons
              name="location-on"
              size={18}
              color={COLOR.PRIMARY_RED}
            />
            <Text style={styles.subtitle}>{selectedPet.location}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{selectedPet.description}</Text>
        </View>
        <CustomButton title="Adopt Now" onClick={handleAdoptNow} height={74} />
      </View>
    </Animated.View>
  );
};

export default PetDetailsModal;
