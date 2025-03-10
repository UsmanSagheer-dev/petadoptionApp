import COLOR from '../../constants/constant';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:COLOR.white,
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor:COLOR.lightGrey,
  },
});

export default styles;
