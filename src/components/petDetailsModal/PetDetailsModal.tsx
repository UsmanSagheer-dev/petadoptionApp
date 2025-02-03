import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import auth from '@react-native-firebase/auth';
import IMAGES from '../../assets/images';
import {useCustomBottomSheet} from '../../hooks/useCustomBottomSheet';
import {CustomBottomSheetProps} from '../../types/componentTypes';
import COLOR from '../../constant/constant';

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isVisible,
  onClose,
  selectedPet,
}) => {
  const {translateY} = useCustomBottomSheet(isVisible);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const firebaseUser = auth().currentUser;

  if (!selectedPet) {
    return null;
  }

  return (
    <Animated.View style={[styles.overlay, {transform: [{translateY}]}]}>
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

        {/* Description Section */}
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

        {/* Logged-in User Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.profileSet}>
            <View style={styles.profile}></View>
            <View>
              <Text style={styles.userName}>
                {currentUser?.displayName ||
                  firebaseUser?.displayName ||
                  currentUser?.email ||
                  'Guest User'}
              </Text>
              <Text>Owner</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Image
              source={IMAGES.LOCATION_VECTOR}
              style={styles.imageLocation}
            />
            <Text style={styles.subtitle}>{selectedPet.location}</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{selectedPet.description}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Adopt Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Overlay & Bottom Sheet
  overlay: {
    position: 'absolute',
    bottom: 350,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  // Header & Handle
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  handle: {
    width: 100,
    height: 7,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },

  // Details Section
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  price: {
    fontSize: 22,
    color: '#FFA500',
    fontWeight: 'bold',
  },

  // Pet Type
  typeContainer: {
    marginBottom: 16,
  },
  type: {
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },

  labelTitle: {
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    color: COLOR.infoText,
  },
  labelSub: {
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },
  // Info Section
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    backgroundColor: COLOR.infoBar,
    padding: 9,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },

  // Description
  descriptionContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 14,

    textAlign: 'center',
  },

  // Profile Section
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginTop: 10,
  },
  profileSet: {
    flexDirection: 'row',
  },
  profile: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: 'gray',
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Location
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  imageLocation: {
    width: 11,
    height: 17,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },

  // Button
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomBottomSheet;
