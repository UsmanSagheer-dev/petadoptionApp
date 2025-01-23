import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { donatePet } from "../../redux/slices/donateSlice";
import PickerInput from "../../components/pickerInput/PickerInput";
import CustomInput from "../../components/input/customInput";
import { PetDonation } from "../../types/auth";
import COLOR from "../../constant/constant";
import { launchImageLibrary } from "react-native-image-picker";
import { Image as RNImage } from "react-native-compressor"; 

const DonateScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
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

  const pickImage = async () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        const originalUri = response.assets[0].uri;
        
        // Ensure originalUri is not undefined before compressing
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
  
          setImageUri(compressedUri);
        } catch (error) {
          console.log("Image compression error:", error);
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
      imageUrl: imageUri, // Save compressed image URL
    };

    dispatch(donatePet(petData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        Alert.alert("Success", "Donation submitted successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.payload as string);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"←"}</Text>
      </TouchableOpacity>

      <PickerInput
        label="Pet Type"
        selectedValue={petType}
        onValueChange={setPetType}
        items={[
          { label: "Select", value: "" },
          { label: "Dog", value: "dog" },
          { label: "Cat", value: "cat" },
        ]}
      />

      <Text style={styles.label}>Pet Breed</Text>
      <CustomInput type="text" placeholder="" value={petBreed} onChange={setPetBreed} />

      <Text style={styles.label}>Amount</Text>
      <CustomInput type="numeric" placeholder="$" value={amount} onChange={setAmount} />

      <PickerInput
        label="Vaccinated"
        selectedValue={vaccinated}
        onValueChange={setVaccinated}
        items={[
          { label: "", value: "" },
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />

      <PickerInput
        label="Gender"
        selectedValue={gender}
        onValueChange={setGender}
        items={[
          { label: "Select", value: "" },
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />

      <Text style={styles.label}>Weight</Text>
      <CustomInput type="numeric" placeholder="KG" value={weight} onChange={setWeight} />

      <Text style={styles.label}>Location</Text>
      <CustomInput type="text" placeholder="Location" value={location} onChange={setLocation} />

      <Text style={styles.label}>Description</Text>
      <CustomInput type="text" placeholder="Description" value={description} onChange={setDescription} />

      {/* Image Picker */}
      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        <Text style={styles.uploadText}>Select Image</Text>
      </TouchableOpacity>

      {/* Show selected image */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.button} onPress={handleDonate} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Submitting..." : "Donate"}</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 30,
  },
  backText: {
    fontSize: 46,
    fontWeight: "900",
    color: "#000",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 5,
    fontFamily: "MontserratRegular",
    color: COLOR.primary,
    marginTop: 10,
  },
  imageUpload: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#000",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    height: 161,
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 16,
    color: "#000",
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default DonateScreen;
