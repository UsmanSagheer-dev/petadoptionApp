import COLOR from "../../constant/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 99,
      backgroundColor:COLOR.white,
      paddingHorizontal: 13,
      
    },
    searchContainer: {
     
      top: 20,
    },
    tabsContainer: {
      marginTop: 25,
    },
    petCardsContainer: {
    gap: 20,
      marginTop: 20,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
    },
    notFoundText:{
    
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
   
    }
  });

  export default styles;