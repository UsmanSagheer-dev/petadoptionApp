import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constant/constant';
import styles from './style';
import useFavorites from '../../hooks/useFavourite';

const DetailScreen = ({route, navigation}) => {
  const {pet} = route.params;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const {toggleFavorite, favorites} = useFavorites();
  const isFavorite = favorites.some((favPet) => favPet.id === pet.id);

  useEffect(() => {
    setIsBottomSheetVisible(true);
  }, []);

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
          onClose={() => {
            setIsBottomSheetVisible(false);
            navigation.goBack();
          }}
          selectedPet={pet}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DetailScreen;
