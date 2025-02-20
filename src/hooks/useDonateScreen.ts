// useDonateScreen.ts
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { donatePet } from "../redux/slices/donateSlice";
import { launchImageLibrary } from "react-native-image-picker";
import { Image as RNImage } from "react-native-compressor";
import { PetDonation } from "../types/types";
import { Alert } from "react-native";
import RNFS from 'react-native-fs';

const useDonateScreen = (navigation: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.donation);
  const [petType, setPetType] = useState("");
  const [gender, setGender] = useState("");
  const [vaccinated, setVaccinated] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [amount, setAmount] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagePreviewUri, setImagePreviewUri] = useState<string | null>(null);
  const [age, setAge] = useState("");

 // useDonateScreen.ts
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

    const petData: PetDonation = {
      petType,
      gender,
      vaccinated,
      petBreed,
      amount,
      weight,
      location,
      description,
      imageUrl: [imageUri], // Changed from imageUrls to match your Firebase schema
      age,
    };

    dispatch(donatePet(petData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        Alert.alert("Success", "Donation submitted successfully!");
        // Reset form
        setPetType("");
        setGender("");
        setVaccinated("");
        setPetBreed("");
        setAmount("");
        setWeight("");
        setLocation("");
        setDescription("");
        setImageUri(null);
        setImagePreviewUri(null);
        setAge("");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.payload as string);
      }
    });
  };

  return {
    petType,
    setPetType,
    gender,
    setGender,
    vaccinated,
    setVaccinated,
    petBreed,
    setPetBreed,
    amount,
    setAmount,
    weight,
    setWeight,
    location,
    setLocation,
    description,
    setDescription,
    imageUri: imagePreviewUri, // Return preview URI for display
    pickImage,
    handleDonate,
    loading,
    error,
    age,
    setAge,
  };
};

export default useDonateScreen;