import COLOR from '../../constants/constant';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: COLOR.white,
  },
  heading: {
    fontSize: 36,
    fontWeight: 800,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },
  textContainer: {
    width: 230,
    marginTop: 20,
  },
  searchContainer: {
    marginTop: 27,
  },
  carousel: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 7,
    height: 102,
  },
  foryou: {
    fontSize: 18,
    fontWeight: 700,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
    marginTop: 24,
  },
  cardsection: {
    marginTop: 24,
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: COLOR.black,
  },
});

export default styles;
