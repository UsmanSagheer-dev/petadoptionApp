import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Linking } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; 
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchProfile } from "../../redux/slices/profileImageSlice";
import COLOR from "../../constant/constant";
import LoginButton from "../../components/button/CustomButton";
import IMAGES from "../../assets/images/index";
interface ProfileData {
  name: string;
  email?: string;
  imageUrl: string | null;
  petBreed?: string;
  petType?: string;
  location?: string;
  dateJoined?: string;
}

const ProfileCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileData = useSelector((state: RootState) => state.profile.profileData);
  const loading = useSelector((state: RootState) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleContactPress = () => {
    if (profileData?.email) {
      Linking.openURL(`mailto:${profileData.email}`);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.profileData}>
        <View>
          <Image
            source={profileData?.imageUrl ? { uri: profileData.imageUrl } : IMAGES.PROFILEIMG}
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.name}>{profileData?.name || "Guest User"}</Text>
          <Text style={styles.breed}> {profileData?.petType || "Unknown Type"}</Text>
          <Text style={styles.email}>{profileData?.email || "No email available"}</Text>

          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="#ff4d4d" />
            <Text style={styles.location}>{profileData?.location || "Unknown Location"}</Text>
          </View>

          <Text style={styles.date}>{profileData?.dateJoined || "Date not available"}</Text>
        </View>
      </View>

      <LoginButton 
        title="Contact" 
        onClick={handleContactPress}
        backgroundColor="black"
        textColor="white"
        width="100%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    width:'100%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileData: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap:30,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    color: COLOR.primary,
  },
  breed: {
    fontSize: 18,
    fontWeight: "700",
    color: COLOR.primary,   
    fontFamily: "MontserratRegular",
  },
  email: {
    fontSize: 10,
    color: COLOR.primary,
    marginTop: 4,
    fontFamily: "MontserratRegular",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    fontFamily: "MontserratRegular",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});

export default ProfileCard;