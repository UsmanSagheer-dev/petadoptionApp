import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; 

import COLOR from "../../constant/constant";
import LoginButton from "../../components/button/CustomButton";

const ProfileCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.profileData}>
        <View>
          <Image
            source={{ uri: "https://via.placeholder.com/80" }} 
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.name}>Talha</Text>
          <Text style={styles.breed}>Cavachon • Dog</Text>
          <Text style={styles.email}>info@techloset.com</Text>

          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="#ff4d4d" />
            <Text style={styles.location}>Lahore, PK.</Text>
          </View>

          <Text style={styles.date}>January 21, 2024</Text>
        </View>
      </View>

      {/* Replace TouchableOpacity with LoginButton */}
      <LoginButton 
        title="Contact" 
        onClick={() => console.log("Contact Button Pressed")}
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
