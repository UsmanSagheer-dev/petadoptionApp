import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { updateProfile, fetchProfile } from "../redux/slices/profileImageSlice";
// import { fetchUser } from "../redux/slices/userSlice";
import { launchImageLibrary } from "react-native-image-picker";
import { readFile } from "react-native-fs";
import { Alert } from "react-native";

const useProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails } = useSelector((state: RootState) => state.user);
  const { profileData, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile
  );

  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails || profileData) {
  
      setName(profileData?.displayName || userDetails?.displayName || "");
      setEmail(profileData?.email || userDetails?.email || "");
      setImageUri(profileData?.photoURL || userDetails?.imageUrl || null); 
    }
  }, [userDetails, profileData]);
  // ✅ Image Pick Karne Ka Function (Update Nahi Karega)
  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.7,
      });

      if (result.assets?.[0]?.uri) {
        const base64 = await readFile(result.assets[0].uri, "base64");
        const imageString = `data:image/jpeg;base64,${base64}`;
        setImageUri(imageString);
        console.log("🚀 ~ pickImage ~ imageString:", imageString)
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUploading(true);
      await dispatch(updateProfile({ 
        name, 
        imageUrl: imageUri || "" 
      })).unwrap();

      await dispatch(fetchProfile());
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
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
    handleUpdateProfile, // ✅ Yeh function ab ProfileScreen mein use hoga
    loading: profileLoading || uploading,
  };
};

export default useProfileScreen;
