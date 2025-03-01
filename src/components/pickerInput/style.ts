import {StyleSheet} from 'react-native';
import COLOR from '../../constant/constant';
import FONTS from '../../assets/fonts/index';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily:FONTS.MontserratRegular,
    color: COLOR.primary,
  },
  pickerContainer: {
    borderBottomWidth: 2,
    borderBottomColor:COLOR.primary,
  },
  picker: {
    fontSize: 16,
    fontFamily:FONTS.MontserratRegular,
    color:'gray',
  },
});

export default styles;
