import COLOR from "../../constant/constant";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingHorizontal: 27,
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
    },
    backText: {
      fontSize: 24,
      color: '#000',
    },
    content: {
      width: '100%',
      marginTop: 12,
      alignItems: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: '800',
      color: COLOR.primary,
      fontFamily: 'MontserratRegular',
    },
    label: {
      fontSize: 18,
      fontWeight: 600,
      fontFamily: 'MontserratRegular',
      alignSelf: 'flex-start',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      fontWeight: 600,
      fontFamily: 'MontserratRegular',
      color: COLOR.primary,
      marginTop: 12,
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: 17,
    },
    login: {
      marginTop: 38,
    },
  });

  export default styles;