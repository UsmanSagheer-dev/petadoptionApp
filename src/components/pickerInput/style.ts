import {StyleSheet} from 'react-native';
import COLOR from '../../constant/constant';

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },
  pickerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#101C1D',
  },
  picker: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },
});

export default styles;
