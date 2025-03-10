import { StyleSheet } from "react-native";
import COLOR from "../../constants/constant";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
  },
  input: {
    flex: 1,
    height: 48,
    paddingLeft: 21,
    borderRadius: 20,
    backgroundColor: COLOR.tertiary,
    color:COLOR.black
  },
  iconContainer: {
    width: 82,
    height: 62,
    backgroundColor:COLOR.black,
    position: "absolute",
    right: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    shadowColor:COLOR.black ,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  icon: {
    width: 25,
    height: 35,
  },
});

export default styles;
