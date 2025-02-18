import React from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { useCustomBottomSheet } from '../../hooks/useCustomBottomSheet';
import { CustomBottomSheetProps } from '../../types/componentTypes';
import IMAGES from '../../assets/images';
import { usePetDetails } from '../../hooks/usePetDetails';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constant/constant';

const PetDetailsModal: React.FC<CustomBottomSheetProps> = ({
  isVisible,
  onClose,
  selectedPet,
}) => {
  const { translateY } = useCustomBottomSheet(isVisible);
  const { profileData, handleAdoptNow } = usePetDetails(selectedPet);

  if (!selectedPet) return null;

  return (
    <Animated.View style={[styles.overlay, { transform: [{ translateY }] }]}>
      <View style={styles.bottomSheet}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <View style={styles.handle} />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>{selectedPet.petBreed}</Text>
          <Text style={styles.price}>${selectedPet.amount}</Text>
        </View>

        <View style={styles.typeContainer}>
          <Text style={styles.type}>{selectedPet.petType}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.labelTitle}>Age</Text>
            <Text style={styles.labelSub}>{selectedPet.age}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelTitle}>Gender</Text>
            <Text style={styles.labelSub}>{selectedPet.gender}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelTitle}>Weight</Text>
            <Text style={styles.labelSub}>{selectedPet.weight}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelTitle}>Vaccinated</Text>
            <Text style={styles.labelSub}>
              {selectedPet.vaccinated ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileSet}>
            <TouchableOpacity>
              <Image
                source={
                  profileData?.photoURL
                    ? { uri: profileData.photoURL }
                    : IMAGES.PROFILEIMG
                }
                style={styles.profile}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.userName}>{profileData.displayName}</Text>
              <Text>Owner</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleAdoptNow}>
          <Text style={styles.buttonText}>Adopt Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default PetDetailsModal;