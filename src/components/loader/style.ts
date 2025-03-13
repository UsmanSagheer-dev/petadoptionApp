import COLOR from "../../constants/constant";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({  
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      marginHorizontal: 5,
    },
    dot1: {
      backgroundColor: COLOR.dotRed,
    },
    dot2: {
      backgroundColor:COLOR.dotTeal,
    },
    dot3: {
      backgroundColor: COLOR.dotBlue,
    },
  });

export default styles;