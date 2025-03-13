import COLOR from '../../constants/constant';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLOR.lightGrey,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.mediumGray
  },
});
