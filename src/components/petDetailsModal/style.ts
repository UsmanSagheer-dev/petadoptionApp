import { StyleSheet } from 'react-native';
import COLOR from '../../constants/constant';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 320,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    width: '100%',
    backgroundColor:COLOR.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor:COLOR.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  handle: {
    width: 100,
    height: 7,
    backgroundColor:COLOR.lightGray2,
    borderRadius: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: COLOR.primary,
    fontFamily:'MontserratRegular',
  },
  price: {
    fontSize: 22,
    color:COLOR.infoText,
    fontWeight: 'bold',
  },
  typeContainer: {
    marginBottom: 16,
  },
  type: {
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    backgroundColor: COLOR.infoBar,
    padding: 9,
    borderRadius: 18,
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  labelTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.infoText,
  },
  labelSub: {
    fontSize: 12,
    color:COLOR.primary,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginTop: 10,
  },
  profileSet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor:COLOR.mediumGray,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 600,
    color:COLOR.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageLocation: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  subtitle: {
    fontSize: 14,
    color:COLOR.primary,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: COLOR.primary,
    lineHeight: 20,
  },
  button: {
    backgroundColor:COLOR.black,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color:COLOR.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
