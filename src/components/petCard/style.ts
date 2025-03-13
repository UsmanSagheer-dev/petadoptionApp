import {StyleSheet} from 'react-native';
import COLOR from '../../constants/constant';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    marginTop: 10,
    borderRadius: 10,
    height: 126,
    width: '100%',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 3.84,
    shadowColor:COLOR.black,
    elevation: 4,
    marginBottom: 10,
  },
  imageContainer: {
    borderRadius: 15,
  },
  image: {
    height: 140,
    width: 191,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.primary,
    marginBottom: 2,
  },
  age: {
    fontSize: 10,
    color: COLOR.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationIcon: {
    width: 9,
    height: 13,
    marginRight: 4,
  },
  location: {
    fontSize: 14,
    color: COLOR.primary,
  },
  genderContainer: {
    gap: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  gender: {
    fontSize: 14,
    color: COLOR.primary,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
  placeholder: {
    width: 126,
    height: 126,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color:COLOR.error,
    textAlign: 'center',
  },
  iconText: {
    color:COLOR.black
  },
  iconContainer: {
    padding: 5,
  },
});
