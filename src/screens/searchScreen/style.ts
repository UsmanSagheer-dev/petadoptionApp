import COLOR from '../../constants/constant';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 99,
    paddingHorizontal: 13,
    backgroundColor: COLOR.white,
  },
  searchContainer: {
    top: 20,
  },
  tabsContainer: {
    width: 330,
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
  notFoundText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
