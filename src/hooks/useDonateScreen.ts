import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { donatePet } from "../redux/slices/donateSlice";
import { launchImageLibrary } from "react-native-image-picker";
import { Image as RNImage } from "react-native-compressor";
import { PetDonationCreate } from "../types/types";
import { Alert } from "react-native";
import RNFS from 'react-native-fs';

const useDonateScreen = (navigation: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.donation);
  
  const [formData, setFormData] = useState({
    petType: "",
    gender: "",
    vaccinated: "",
    petBreed: "",
    petName: "",
    petAge: "",
    description: "",
    location: "",
    contactNumber: "",
    amount: "",
    minWeight: "", 
  });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagePreviewUri, setImagePreviewUri] = useState<string | null>(null);

  const pickImage = async () => {
    launchImageLibrary({ 
      mediaType: "photo", 
      quality: 1,
      includeBase64: true 
    }, async (response) => {
      if (response.didCancel) return;
      
      if (response.errorCode) {
        Alert.alert("Error", "Image picker error");
        return;
      }

      const asset = response.assets?.[0];
      if (!asset?.uri) return;

      try {
        setImagePreviewUri(asset.uri);
        
        const compressedUri = await RNImage.compress(asset.uri, {
          quality: 0.7,
          maxWidth: 800,
          maxHeight: 800,
        });

        const base64String = await RNFS.readFile(compressedUri, 'base64');
        setImageUri(`data:image/jpeg;base64,${base64String}`);
      } catch (error) {
        console.log("Image processing error:", error);
        Alert.alert("Error", "Failed to process image");
      }
    });
  };

  const handleDonate = () => {
    if (!imageUri) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    const petData: PetDonationCreate = {
      ...formData,
      imageUrl: [imageUri],
    };

    dispatch(donatePet(petData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        Alert.alert("Success", "Donation submitted successfully!");
        setFormData({
          petType: "",
          gender: "",
          vaccinated: "",
          petBreed: "",
          petName: "",
          petAge: "",
          description: "",
          location: "",
          contactNumber: "",
          amount: "",
          minWeight: "", 
        });
        setImageUri(null);
        setImagePreviewUri(null);
        navigation.goBack();
      } else {
        Alert.alert("Error", result.payload as string);
      }
    });
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    updateFormData,
    imageUri: imagePreviewUri,
    pickImage,
    handleDonate,
    loading,
    error,
  };
};

export default useDonateScreen;