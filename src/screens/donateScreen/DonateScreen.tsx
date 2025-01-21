import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import PickerInput from '../../components/pickerInput/PickerInput';
import CustomInput from '../../components/input/customInput';
import COLOR from '../../constant/constant';
import IMAGES from '../../assets/images';

const DonateScreen = ({navigation}) => {
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [vaccinated, setVaccinated] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [amount, setAmount] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageUpload = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      const selectedUri = response.assets?.[0]?.uri ?? null;
      setImageUri(selectedUri);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{'←'}</Text>
      </TouchableOpacity>

      <PickerInput
        label="Pet Type"
        selectedValue={petType}
        onValueChange={setPetType}
        items={[
          {label: 'Select', value: ''},
          {label: 'Dog', value: 'dog'},
          {label: 'Cat', value: 'cat'},
        ]}
      />

      <Text style={styles.label}>Pet Breed</Text>
      <CustomInput
        type="text"
        placeholder=""
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

      <PickerInput
        label="Vaccinated"
        selectedValue={vaccinated}
        onValueChange={setVaccinated}
        items={[
          {label: '', value: ''},
          {label: 'Yes', value: 'yes'},
          {label: 'No', value: 'no'},
        ]}
      />

      <PickerInput
        label="Gender"
        selectedValue={gender}
        onValueChange={setGender}
        items={[
          {label: 'Select', value: ''},
          {label: 'Male', value: 'male'},
          {label: 'Female', value: 'female'},
        ]}
      />

      <Text style={styles.label}>Weight</Text>
      <CustomInput
        type="numeric"
        placeholder="KG"
        value={weight}
        onChange={setWeight}
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

      <Text style={styles.label}>Image</Text>
      <TouchableOpacity style={styles.imageUpload} onPress={handleImageUpload}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.imagePreview} />
        ) : (
          <View style={styles.imageContainer}>
            <Image source={IMAGES.UPLOADIMG} alt="upload image" />
            <Text>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Donate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 30,
  },
  backText: {
    fontSize: 46,
    fontWeight: 900,
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 5,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
    marginTop: 10,
  },
  imageUpload: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    height: 161,
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 16,
    color: '#000',
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  imageContainer:{
justifyContent: 'center',
alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DonateScreen;
