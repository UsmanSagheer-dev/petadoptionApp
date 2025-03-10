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
} from '../../constants/constant';

const DonateScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {
    formData,
    updateFormData,
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
        selectedValue={formData.petType}
        onValueChange={value => updateFormData('petType', value)}
        items={PET_TYPE_OPTIONS}
      />

      <PickerInput
        label="Vaccinated"
        selectedValue={formData.vaccinated}
        onValueChange={value => updateFormData('vaccinated', value)}
        items={VACCINATION_OPTIONS}
      />

      <PickerInput
        label="Gender"
        selectedValue={formData.gender}
        onValueChange={value => updateFormData('gender', value)}
        items={GENDER_OPTIONS}
      />

      <Text style={styles.label}>Pet Breed</Text>
      <CustomInput
        type="text"
        placeholder="Name"
        value={formData.petBreed}
        onChange={value => updateFormData('petBreed', value)}
      />

      <Text style={styles.label}>Amount</Text>
      <CustomInput
        type="numeric"
        placeholder="$"
        value={formData.amount}
        onChange={value => updateFormData('amount', value)}
      />

      <Text style={styles.label}>Weight</Text>
      <CustomInput
        type="numeric"
        placeholder="KG"
        value={formData.minWeight}
        onChange={value => updateFormData('minWeight', value)}
      />

      <Text style={styles.label}>Age</Text>
      <CustomInput
        type="numeric"
        placeholder="Years"
        value={formData.petAge}
        onChange={value => updateFormData('petAge', value)}
      />

      <Text style={styles.label}>Location</Text>
      <CustomInput
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={value => updateFormData('location', value)}
      />

      <Text style={styles.label}>Description</Text>
      <CustomInput
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={value => updateFormData('description', value)}
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
