import {StyleSheet} from 'react-native';
import COLOR from '../../constants/constant';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },
  pickerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: COLOR.primary,
  },
  picker: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },
});

export default styles;
