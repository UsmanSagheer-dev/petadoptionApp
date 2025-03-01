import FONTS from '../../assets/fonts/index';
import COLOR from '../../constant/constant';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor:COLOR.primary,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily:FONTS.MontserratRegular,
    color:COLOR.black
  },
});
