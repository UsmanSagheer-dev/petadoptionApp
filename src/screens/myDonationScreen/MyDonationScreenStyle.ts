import COLOR from '../../constant/constant';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.white},
  petCardsContainer: {padding: 15},
  petCardWrapper: {},
  errorText: {color: COLOR.error, textAlign: 'center', marginTop: 20},
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLOR.warning,
    marginTop: 20,
  },
});

export default styles;