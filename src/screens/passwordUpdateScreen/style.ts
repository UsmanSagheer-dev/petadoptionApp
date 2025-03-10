import COLOR from '../../constants/constant';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLOR.white,
    justifyContent: 'space-between',
  },
  titleContainer: {paddingTop: 41, alignItems: 'center', marginBottom: 20},
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.primary,
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  inputContainer: {marginTop: 42, marginBottom: 20},
  inputContainer1: {marginTop: 24},
  buttonContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
