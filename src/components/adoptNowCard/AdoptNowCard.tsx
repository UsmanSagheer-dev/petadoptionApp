import React from "react";
import { View, Text, Image, Linking } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import useProfile from "../../hooks/useProfile";
import LoginButton from "../button/CustomButton";
import IMAGES from "../../assets/images/index";
import styles from "./style";

// Define the interfaces for type safety
interface ProfileData {
  uid: string; // Add the uid property here
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

interface AdoptionRequest {
  userId: string;
  userName: string;
  userEmail: string;
  timestamp: string;
}

interface PetDonation {
  id: string;
  userId: string;
  userName: string;
  petType: string;
  location: string;
  requests: AdoptionRequest[];
  createdAt: {
    toDate: () => Date;
  };
}

interface RootState {
  donation: {
    donations: PetDonation[];
  };
}

const AdoptNowCard = () => {
  const { profileData, loading } = useProfile();
  
  const donations = useSelector((state: RootState) => state.donation.donations);
  
  const userDonation = donations.find((donation) => 
    donation.requests?.some(request => request.userId === profileData?.uid)
  );

  const handleContactPress = () => {
    if (profileData?.email) {
      Linking.openURL(`mailto:${profileData.email}`);
    }
  };

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.card}>
      <View style={styles.profileData}>
        <Image
          source={profileData?.photoURL ? { uri: profileData.photoURL } : IMAGES.PROFILEIMG}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{profileData?.displayName || "Guest User"}</Text>
          <Text style={styles.breed}>{userDonation?.petType || "Unknown Type"}</Text>
          <Text style={styles.email}>{profileData?.email || "No email available"}</Text>
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