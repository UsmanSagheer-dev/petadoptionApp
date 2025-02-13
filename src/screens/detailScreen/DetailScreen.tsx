import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import PetDetailsModal from '../../components/petDetailsModal/PetDetailsModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../../constant/constant';

const DetailScreen = ({ route, navigation }) => {
  const { id, name, pet, deletePet } = route.params; // ✅ Accepting pet and deletePet
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useEffect(() => {
    setIsBottomSheetVisible(true);
  }, []);

  const handleDeletePet = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this pet?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deletePet(id); // ✅ Pet delete karega
            setIsBottomSheetVisible(false);
            navigation.goBack(); // ✅ Modal close + screen back
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsBottomSheetVisible(false)}> 
      <View style={styles.container}>
        <View style={styles.detailHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="long-arrow-left" size={24} color={COLOR.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeletePet}>
            <MaterialIcons name="delete" size={24} color={COLOR.white} />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.quaternary },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 },
  backButton: {},
});

export default DetailScreen;
