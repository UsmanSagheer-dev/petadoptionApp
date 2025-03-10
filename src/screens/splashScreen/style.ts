import COLOR from "../../constants/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      backgroundColor: '#101C1DC9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      alignItems: 'center',
      padding: 20,
    },
    mainText: {
      color:COLOR.white,
      fontSize: 40,
      fontWeight: '800',
      textAlign: 'center',
      fontFamily:'MontserratRegular',
    },
    mainText1: {
        color:COLOR.white,
      fontSize: 40,
      fontWeight: '800',
      textAlign: 'center',
    },
    subText: {
        color:COLOR.white,
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 15,
      fontFamily:'MontserratRegular',
    },
  });

  export default styles;

