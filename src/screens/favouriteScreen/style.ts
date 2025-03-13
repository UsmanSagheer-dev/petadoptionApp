import COLOR from '../../constants/constant';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  petCardsContainer: {
    marginTop: 20,
    paddingHorizontal: 17,
  },
  noFavoritesText: {
    fontSize: 18,
    color:COLOR.mediumGray,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
