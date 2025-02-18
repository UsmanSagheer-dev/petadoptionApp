import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { donatePet } from "../redux/slices/donateSlice";
import { launchImageLibrary } from "react-native-image-picker";
import { Image as RNImage } from "react-native-compressor";
import { PetDonation } from "../types/auth";
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
const [age, setAge]=useState("");
  const pickImage = async () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        const originalUri = response.assets[0].uri;
        if (!originalUri) {
          console.log("No image selected");
          return;
        }
        try {
          const compressedUri = await RNImage.compress(originalUri, {
            compressionMethod: "auto",
            quality: 0.6,
            maxWidth: 800,
            maxHeight: 800,
          });
          
          // Convert compressed image to Base64
          const base64String = await RNFS.readFile(compressedUri, 'base64');
          setImageUri(base64String);
        } catch (error) {
          console.log("Image processing error:", error);
        }
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
      imageUrls: [imageUri],
      age,
    };

    dispatch(donatePet(petData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        Alert.alert("Success", "Donation submitted successfully!");
        setPetType("");
        setGender("");
        setVaccinated("");
        setPetBreed("");
        setAmount("");
        setWeight("");
        setLocation("");
        setDescription("");
        setImageUri(null);
        setAge('');
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
    imageUri,
    pickImage,
    handleDonate,
    loading,
    error,
    age,
  setAge,
  };
};

export default useDonateScreen;
