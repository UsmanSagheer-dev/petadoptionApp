import {StyleSheet} from 'react-native';
import COLOR from '../../constant/constant';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 171,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    marginBottom: 12,
    borderRadius: 10,
  },
  imageContainer: {
    width: 200,
    backgroundColor: COLOR.quaternary,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 999,
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 5,
    shadowRadius: 6,
    elevation: 8,
  },
  infoCard: {
    flex: 1,
    backgroundColor: COLOR.white,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 12,
    marginLeft: -10,
    height: 126,
    width: 200,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  details: {
    left: 10,
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
    top: 2,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
    height: 30,
  },
  locationIcon: {
    width: 9,
    height: 13,
    marginRight: 4,
  },
  location: {
    fontSize: 14,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 194,
    height: 171,
    backgroundColor: COLOR.quaternary,
    borderRadius: 20,
  },
  placeholderText: {
    color: '#666',
    textAlign: 'center',
  },
  iconText: {
    color: '#000',
  },
  iconContainer: {
    padding: 5,
  },
});
