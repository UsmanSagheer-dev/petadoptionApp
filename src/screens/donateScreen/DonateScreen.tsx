import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import CustomInput from '../../components/input/customInput';
import PickerInput from '../../components/pickerInput/PickerInput';
import useDonateScreen from '../../hooks/useDonateScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import {
  PET_TYPE_OPTIONS,
  VACCINATION_OPTIONS,
  GENDER_OPTIONS,
} from '../../constant/constant';

const DonateScreen: React.FC<{navigation: any}> = ({navigation}) => {
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <PickerInput
        label="Pet Type"
        selectedValue={petType}
        onValueChange={setPetType}
        items={PET_TYPE_OPTIONS}
      />

<PickerInput
        label="Vaccinated"
        selectedValue={vaccinated}
        onValueChange={setVaccinated}
        items={VACCINATION_OPTIONS}
      />

      <PickerInput
        label="Gender"
        selectedValue={gender}
        onValueChange={setGender}
        items={GENDER_OPTIONS}
      />

      <Text style={styles.label}>Pet Breed</Text>
      <CustomInput
        type="text"
        placeholder="Name"
        value={petBreed}
        onChange={setPetBreed}
      />

      <Text style={styles.label}>Amount</Text>
      <CustomInput
        type="numeric"
        placeholder="$"
        value={amount}
        onChange={setAmount}
      />

      

      <Text style={styles.label}>Weight</Text>
      <CustomInput
        type="numeric"
        placeholder="KG"
        value={weight}
        onChange={setWeight}
      />

      <Text style={styles.label}>Age</Text>
      <CustomInput
        type="numeric"
        placeholder="Years"
        value={age}
        onChange={setAge}
      />

      <Text style={styles.label}>Location</Text>
      <CustomInput
        type="text"
        placeholder="Location"
        value={location}
        onChange={setLocation}
      />

      <Text style={styles.label}>Description</Text>
      <CustomInput
        type="text"
        placeholder="Description"
        value={description}
        onChange={setDescription}
      />

      <View>
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {!imageUri && (
            <View style={styles.iconUpload}>
              <Icon name="cloud-upload" size={24} color="#000" />
              <Text style={styles.uploadText}>Select Image</Text>
            </View>
          )}
          {imageUri && (
            <Image source={{uri: imageUri}} style={styles.imagePreview} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleDonate}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Donate'}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

export default DonateScreen;
