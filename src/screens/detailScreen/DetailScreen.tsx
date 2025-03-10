// screens/DetailScreen.tsx
import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constants/constant';
import styles from './style';
import useFavorites from '../../hooks/useFavourite';
import { usePetDetails } from '../../hooks/usePetDetails';

const DetailScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const { toggleFavorite, favorites } = useFavorites();
  const { profileData, handleAdoptNow } = usePetDetails(pet);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(true);
  const isFavorite = favorites.some((favPet) => favPet.id === pet.id);

  const handleClose = () => {
    setIsBottomSheetVisible(false);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsBottomSheetVisible(false)}>
      <View style={styles.container}>
        <View style={styles.detailHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="long-arrow-left" size={24} color={COLOR.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(pet)}>
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? COLOR.error : COLOR.white}
            />
          </TouchableOpacity>
        </View>

        <PetDetailsModal
          isVisible={isBottomSheetVisible}
          onClose={handleClose}
          selectedPet={pet}
          ownerData={profileData}
          onAdoptNow={handleAdoptNow}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DetailScreen;