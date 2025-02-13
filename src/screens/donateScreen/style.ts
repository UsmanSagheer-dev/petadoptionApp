import {StyleSheet} from 'react-native';
import COLOR from '../../constant/constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 30,
  },
  backText: {
    fontSize: 46,
    fontWeight: '900',
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
    marginTop: 10,
  },
  imageUpload: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    height: 161,
    borderRadius: 10,
    marginTop: 20,
  },
  uploadText: {
    fontSize: 16,
    color: '#000',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  iconUpload:{
    justifyContent: 'center',
    alignItems: 'center',
   
  }
});

export default styles;
