import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { updateProfile, fetchProfile } from "../redux/slices/profileImageSlice";
import { fetchUser } from "../redux/slices/userSlice";
import { launchImageLibrary } from "react-native-image-picker";
import { readFile } from 'react-native-fs';
import { Alert } from "react-native";

const useProfileScreen = (navigation: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails } = useSelector((state: RootState) => state.user);
  const { profileData, loading: profileLoading } = useSelector((state: RootState) => state.profile);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails || profileData) {
      setName(profileData?.name || userDetails?.displayName || "");
      setEmail(profileData?.email || userDetails?.email || "");
      setImageUri(profileData?.imageUrl || userDetails?.photoURL || null);
    }
  }, [userDetails, profileData]);

  const pickImage = async () => {
    try {
      setUploading(true);
      const result = await launchImageLibrary({ 
        mediaType: "photo", 
        quality: 0.7 
      });

      if (result.assets?.[0]?.uri) {
        const base64 = await readFile(result.assets[0].uri, 'base64');
        const imageString = `data:image/jpeg;base64,${base64}`;
        console.log("dshgkjfds",imageString);
        
        await dispatch(updateProfile({ 
          name, 
          imageUrl: imageString 
        })).unwrap();
        
        setImageUri(imageString);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    imageUri,
    pickImage,
    loading: profileLoading || uploading,
  };
};

export default useProfileScreen;