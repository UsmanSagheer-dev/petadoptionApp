import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('screen');

interface Pet {
  id: string;
  petBreed: string;
  amount: string;
  location: string;
  gender: string;
  isFavorite: boolean;
  imageUrl: string;
  age: string; // Added
  weight: string; // Added
  vaccinated: boolean; // Added
  type: string; // Added
}

interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedPet?: Pet | null;
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isVisible,
  onClose,
  selectedPet,
}) => {
  const translateY = useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: height * 0.4, // Adjust this value based on your desired content area
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

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
        <Text style={styles.type}>{selectedPet.type}</Text>
        <Text style={styles.subtitle}>{selectedPet.location}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text>Age</Text>
            <Text>{selectedPet.age}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text>Gender</Text>
            <Text>{selectedPet.gender}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text>Weight</Text>
            <Text>{selectedPet.weight}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text>Vaccinated</Text>
            <Text>{selectedPet.vaccinated ? 'Yes' : 'No'}</Text>
          </View>
        </View>
        <View>
          <View style={styles.profileContainer}>
            <View style={styles.profile} ></View>
            <View></View>
          </View>
          <View></View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Adopt Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
   
    backgroundColor: '#F8F9FA',
   
  },
  overlay: {
    position: 'absolute',
    bottom: 350,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
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
  header: {alignItems: 'center', marginBottom: 10},
  handle: {width: 100, height: 7, backgroundColor: '#ccc', borderRadius: 10},
  title: {fontSize: 24, fontWeight: 'bold'},
  subtitle: {fontSize: 16, color: 'gray'},
  price: {
    fontSize: 22,
    color: '#FFA500',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoBox: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  type: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  // Added properties for age, weight, vaccinated, and gender

  profile: {
    width: 38,
    height: 37,
    borderRadius: 50,
    backgroundColor: 'gray',
  },
});

export default CustomBottomSheet;
