import { StyleSheet } from "react-native";
import COLOR from "../../constant/constant";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.quaternary,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {},
});

export default styles;
