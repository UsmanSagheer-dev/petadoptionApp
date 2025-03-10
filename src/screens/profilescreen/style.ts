import COLOR from "../../constants/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLOR.white,
      paddingHorizontal: 20,
    },
    titleContainer: {
      marginTop: 41,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLOR.primary,
    },
    profileLogo: {
      marginTop: 36,
      width: 125,
      height: 125,
      borderRadius: 62.5,
      borderColor: COLOR.primary,
      borderWidth: 1,
      alignSelf: 'center',
      borderStyle: 'dashed',
      backgroundColor: COLOR.BorderBack,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    inputFields: {
      marginTop: 42,
      marginBottom: 50,
    },
    inputContainer: {
      marginTop: 20,
    },
    label: {
      fontSize: 16,
      color: COLOR.primary,
      marginBottom: 8,
      alignSelf: 'flex-start', 
    },
    
    buttonContainer: {
      marginTop: 50,
      alignItems: 'center',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default styles;