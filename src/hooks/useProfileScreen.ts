import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { updateProfile, fetchProfile } from "../redux/slices/profileImageSlice";
import { fetchUser } from "../redux/slices/userSlice";
import { launchImageLibrary } from "react-native-image-picker";
import { Image as RNImage } from "react-native-compressor";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const useProfileScreen = (navigation: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails, loading: userLoading } = useSelector((state: RootState) => state.user);
  const { profileData, loading: profileLoading } = useSelector((state: RootState) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const loading = userLoading || profileLoading;

  // ✅ Fetch user data from Redux
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // ✅ Update local state when userDetails or profileData is available
  useEffect(() => {
    if (userDetails || profileData) {
      setTimeout(() => {
        setName(profileData?.name || userDetails?.displayName || "");
        setEmail(profileData?.email || userDetails?.email || "");
        setImageUri(profileData?.imageUrl || userDetails?.photoURL || null);
      }, 500);
    }
  }, [userDetails, profileData]);

  // ✅ Image Picker
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
          setImageUri(compressedUri);
        } catch (error) {
          console.log("Image compression error:", error);
          Alert.alert("Error", "Failed to process image");
        }
      }
    });
  };

  return {
    name,
    setName,
    email,
    setEmail,
    imageUri,
    pickImage,
    loading,
  };
};

export default useProfileScreen;
