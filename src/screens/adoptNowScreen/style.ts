import {StyleSheet} from 'react-native';
import COLOR from '../../constants/constant';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 17,


  },
  
  cardContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 30,
    fontFamily: 'MontserratRegular',
  },
});

export default styles;
