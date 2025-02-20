import COLOR from "../../constant/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 99,
      backgroundColor:COLOR.white,
      paddingHorizontal: 20,
    },
    searchContainer: {
      top: 20,
    },
    tabsContainer: {
      marginTop: 25,
    },
    petCardsContainer: {
      marginTop: 20,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
    },
  });

  export default styles;