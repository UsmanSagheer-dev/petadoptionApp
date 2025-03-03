import { StyleSheet } from "react-native";
import COLOR from "../../constant/constant";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    width: "100%",
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
    gap: 30,
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
    fontWeight:500,
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
    fontSize: 10,
    fontWeight:500,
    marginTop: 4,
    fontFamily: "MontserratRegular",
  },
  date: {
    fontSize: 10,
    fontWeight:500,
    marginTop: 4,
  },
});

export default styles;
