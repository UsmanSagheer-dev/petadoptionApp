import {StyleSheet} from 'react-native';
import COLOR from '../../constants/constant';

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    borderRadius: 20,
  },
  content: {
    position: 'absolute',
    zIndex: 1,
  },
  title: {
    fontSize: 29,
    fontWeight: '800',
    fontFamily: 'MontserratRegular',
    color: COLOR.white,
  },
  datetext: {
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    color: COLOR.white,
  },
  moneytext: {
    fontSize: 25,
    fontWeight: '800',
    fontFamily: 'MontserratRegular',
    color: COLOR.white,
    marginTop: 5,
  },
});

export default styles;
