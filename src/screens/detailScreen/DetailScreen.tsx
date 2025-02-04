import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomBottomSheet from '../../components/petDetailsModal/PetDetailsModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constant/constant';

const DetailScreen = ({route, navigation}) => {
  const {pet} = route.params;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.detailHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="long-arrow-left" size={24} color={COLOR.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={24} color={COLOR.white} />
        </TouchableOpacity>
      </View>

      <CustomBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        selectedPet={pet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.quaternary,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {},
});

export default DetailScreen;
