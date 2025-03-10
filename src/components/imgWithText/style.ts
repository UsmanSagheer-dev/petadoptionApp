import {StyleSheet} from 'react-native';
import COLOR from '../../constants/constant';

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
    borderRadius: 50,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily:'MontserratRegular',
    color: COLOR.primary,
  },
});

export default styles;
