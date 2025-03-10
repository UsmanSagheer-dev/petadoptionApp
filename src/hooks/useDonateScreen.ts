import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {donatePet} from '../redux/slices/petSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image as RNImage} from 'react-native-compressor';
import {PetDonationCreate} from '../types/types';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';

const useDonateScreen = (navigation: any) => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.pet);

  const [formData, setFormData] = useState({
    petType: '',
    gender: '',
    vaccinated: '',
    petBreed: '',
    petName: '',
    petAge: '',
    description: '',
    location: '',
    contactNumber: '',
    amount: '',
    minWeight: '',
  });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagePreviewUri, setImagePreviewUri] = useState<string | null>(null);

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      async response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Image picker error',
          });
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
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to process image',
          });
        }
      },
    );
  };

  const handleDonate = () => {
    if (!imageUri) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select an image',
      });
      return;
    }

    const petData: PetDonationCreate = {
      ...formData,
      imageUrl: [imageUri],
    };

    dispatch(donatePet(petData)).then(result => {
      if (result.meta.requestStatus === 'fulfilled') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Donation submitted successfully!',
        });

        setFormData({
          petType: '',
          gender: '',
          vaccinated: '',
          petBreed: '',
          petName: '',
          petAge: '',
          description: '',
          location: '',
          contactNumber: '',
          amount: '',
          minWeight: '',
        });
        setImageUri(null);
        setImagePreviewUri(null);
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.payload as string,
        });
      }
    });
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
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
