import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: "#101C1D",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  link: {
    fontFamily: "MontserratRegular",
    color: "#101C1D",
    textDecorationLine: "underline",
  },
});

export default styles;
