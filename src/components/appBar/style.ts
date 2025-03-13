import {StyleSheet} from 'react-native';
import COLOR from '../../constants/constant';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.primary,
    fontFamily:'MontserratRegular',
  },
  plus: {
    fontSize: 36,
    fontWeight: '500',
    color: COLOR.primary,
  },
});

export default styles;
