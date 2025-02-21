import { StyleSheet } from 'react-native';
import COLOR from '../../constant/constant';

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: COLOR.quaternary,
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: 'justify',
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
    color: COLOR.primary,
    marginTop: 5,
  },
});

export default styles;
