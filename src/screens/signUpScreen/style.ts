import COLOR from '../../constant/constant';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 27,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  form: {
    marginTop: 30,
  },
  termsContainer: {
    marginTop: 14,
  },
  maininputContainer: {
    width: '100%',
    gap: 22,
  },
  inputContainer: {},
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 600,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
  },
  buttonGroupContainer: {
    width: '100%',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'MontserratRegular',
  },
  googleimg: {
    width: 40,
    height: 36,
  },
  googlecontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    textAlign: 'center',
    gap: 5,
  },
  googleText: {
    fontSize: 18,
    fontWeight: 700,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
    marginBottom: 8,
  },
signupButtonContainer: {
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
buttonLoader: {
  position: 'absolute',
  right: 20,
},
});

export default styles;
