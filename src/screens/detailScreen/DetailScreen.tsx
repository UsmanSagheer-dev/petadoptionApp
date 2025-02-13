import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Alert, TouchableWithoutFeedback } from "react-native";
import PetDetailsModal from "../../components/petDetailsModal/PetDetailsModal";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import COLOR from "../../constant/constant";
import styles from "./style";

const DetailScreen = ({ route, navigation }) => {
  const { id, pet, deletePet } = route.params; 
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useEffect(() => {
    setIsBottomSheetVisible(true);
  }, []);

  const handleDeletePet = useCallback(() => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this pet?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deletePet(id);
          setIsBottomSheetVisible(false);
          navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  }, [id, deletePet, navigation]);

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

export default DetailScreen;
