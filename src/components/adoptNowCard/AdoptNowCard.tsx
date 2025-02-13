import React from "react";
import { View, Text, Image, Linking } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useProfile from "../../hooks/useProfile";
import LoginButton from "../button/CustomButton";
import IMAGES from "../../assets/images/index";
import styles from "./style";

const AdoptNowCard = () => {
  const { profileData } = useProfile();

  const handleContactPress = () => {
    if (profileData?.email) {
      Linking.openURL(`mailto:${profileData.email}`);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.profileData}>
        <Image
          source={profileData?.imageUrl ? { uri: profileData.imageUrl } : IMAGES.PROFILEIMG}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{profileData?.name || "Guest User"}</Text>
          <Text style={styles.breed}>{profileData?.petType || "Unknown Type"}</Text>
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

export default AdoptNowCard;
