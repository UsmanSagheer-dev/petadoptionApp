import React from "react";
import { View, Text, Image, Linking } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import useProfile from "../../hooks/useProfile";
import LoginButton from "../button/CustomButton";
import IMAGES from "../../assets/images/index";
import styles from "./adoptNowCardStyle";
import {RootState} from '../../types/types'

const AdoptNowCard = () => {
  const { profileData } = useProfile();
  const donations = useSelector((state: RootState) => state.donation.donations);
  const userDonation = donations.find((donation) => 
    donation.requests?.some(request => request.userId === profileData?.uid)
  );
  const handleContactPress = () => {
    if (userDonation?.ownerEmail) {
      Linking.openURL(`mailto:${userDonation.ownerEmail}`);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.profileData}>
        <Image
          source={userDonation?.ownerPhotoURL 
            ? { uri: userDonation.ownerPhotoURL } 
            : IMAGES.PROFILEIMG
          }
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>
            {userDonation?.ownerDisplayName || "Guest User"}
          </Text>
          <Text style={styles.breed}>{userDonation?.petType || "Unknown Type"}</Text>
          <Text style={styles.email}>
            {userDonation?.ownerEmail || "No email available"}
          </Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="#ff4d4d" />
            <Text style={styles.location}>{userDonation?.location || "Unknown Location"}</Text>
          </View>
          <Text style={styles.date}>
            {userDonation?.createdAt?.toDate().toLocaleDateString() || "Date not available"}
          </Text>
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