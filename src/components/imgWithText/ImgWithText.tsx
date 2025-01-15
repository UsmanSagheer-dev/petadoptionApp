import { View, Text, Image,StyleSheet } from 'react-native';
import React from 'react';
import COLOR from '../../constant/constant';

const ImgWithText = ({ imageSource,  label }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={imageSource} alt='profile' style={styles.image} />
      </View>
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
container:{
justifyContent: 'center',
  alignItems: 'center',
  gap:12,
  height:102,


},
image: {
width:72,
height:72,
},

title: {
fontSize:14,
fontWeight:600,
fontFamily: 'MontserratRegular',
color: COLOR.primary,
}
})
export default ImgWithText;
