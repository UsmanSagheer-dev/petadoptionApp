import COLOR from '../../constant/constant';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: COLOR.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 13,
    height: 13,
    backgroundColor: '#101C1D',
    textAlign: 'center',
    lineHeight: 10,
  },
  text: {
    width: '100%',
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
    flexWrap: 'wrap',
    overflow: 'hidden',
    paddingHorizontal: 8,
  },
  link: {
    fontWeight: 600,
    fontFamily: 'MontserratRegular',
    color: '#101C1D',
    textDecorationLine: 'underline',
    lineHeight: 17,
  },
});

export default styles;
