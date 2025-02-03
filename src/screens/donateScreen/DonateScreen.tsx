import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import CustomInput from "../../components/input/customInput";
import PickerInput from "../../components/pickerInput/PickerInput";
import COLOR from "../../constant/constant";
import useDonateScreen from "../../hooks/useDonateScreen";

const DonateScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
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
    age,
    setAge,
    imageUri,
    pickImage,
    handleDonate,
    loading,
    error,
  } = useDonateScreen(navigation);

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
          { label: "Bunnies", value: "bunnies" },
          { label: "Birds", value: "birds" },
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

      <Text style={styles.label}>Age</Text>
      <CustomInput type="numeric" placeholder="Years" value={age} onChange={setAge} />

      <Text style={styles.label}>Location</Text>
      <CustomInput type="text" placeholder="Location" value={location} onChange={setLocation} />

      <Text style={styles.label}>Description</Text>
      <CustomInput type="text" placeholder="Description" value={description} onChange={setDescription} />
      <View>
  <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
    {!imageUri && <Text style={styles.uploadText}>Select Image</Text>}
    {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
  </TouchableOpacity>
</View>


     
    

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
    marginTop: 20,

  },
  uploadText: {
    fontSize: 16,
    color: "#000",
  },
  imagePreview: {
    width: '100%',
    height:'100%',
  
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
