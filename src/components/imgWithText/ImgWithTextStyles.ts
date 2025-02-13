import {StyleSheet} from 'react-native';
import COLOR from '../../constant/constant';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    height: 102,
  },
  image: {
    width: 72,
    height: 72,
  },
  title: {
    fontSize: 14,
    fontWeight: '600', 
    fontFamily: 'Montserrat-Regular',
    color: COLOR.primary,
  },
});

export default styles;
