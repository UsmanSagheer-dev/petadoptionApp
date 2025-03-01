import {StyleSheet} from 'react-native';
import COLOR from '../../constant/constant';
import FONTS from '../../assets/fonts/index';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  selectedTab: {
    backgroundColor: COLOR.infoText,
  },
  tabText: {
    color: COLOR.primary,
    fontSize: 14,
    fontWeight: 600,
    fontFamily:'MontserratRegular',
  },
  selectedTabText: {
    color: COLOR.white,
  },
});

export default styles;
