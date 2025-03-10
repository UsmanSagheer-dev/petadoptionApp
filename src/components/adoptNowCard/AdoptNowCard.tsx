import React from "react";
import { View, Text, Image, Linking } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAppSelector } from "../../hooks/hooks";
import useProfile from "../../hooks/useProfile";
import CustomButton from "../customButton/CustomButton";
import IMAGES from "../../assets/images/index";
import styles from "./style";
import { RootState } from "../../redux/store";

const AdoptNowCard = () => {
  const { profileData } = useProfile();
  const donations = useAppSelector((state: RootState) => state.pet.donations);

  const userDonation = donations.find((donation) =>
    donation.requests?.some((request) => request.userId === profileData?.uid)
  );

  console.log("Profile Data:", profileData);
  console.log("User Donation:", userDonation);
  console.log("Photo URL:", userDonation?.ownerPhotoURL);

  const handleContactPress = () => {
    if (userDonation?.ownerEmail) {
      Linking.openURL(`mailto:${userDonation.ownerEmail}`);
    }
  };

  if (!userDonation) {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>No adoption requests found</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.profileData}>
        <Image
          source={
            userDonation.ownerPhotoURL
              ? { uri: userDonation.ownerPhotoURL }
              : IMAGES.PROFILEIMG
          }
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>
            {userDonation.ownerDisplayName || "Guest User"}
          </Text>
          <Text style={styles.breed}>{userDonation.petType || "Unknown Type"}</Text>
          <Text style={styles.email}>
            {userDonation.ownerEmail || "No email available"}
          </Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="#ff4d4d" />
            <Text style={styles.location}>
              {userDonation.location ?? "Unknown Location"}
            </Text>
          </View>
          <Text style={styles.date}>
            {userDonation.createdAt?.toDate instanceof Function
              ? userDonation.createdAt.toDate().toLocaleDateString()
              : "Date not available"}
          </Text>
        </View>
      </View>
      <CustomButton
        title="Contact"
        onClick={handleContactPress}
        backgroundColor="black"
        textColor="white"
        width="100%"
        height={36}
      />
    </View>
  );
};

export default AdoptNowCard;