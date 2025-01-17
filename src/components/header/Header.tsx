import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import IMAGES from '../../assets/images';
import {useNavigation, DrawerActions} from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={IMAGES.MODELTABL} alt="modeltab" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={IMAGES.PROFILEIMG}
          alt="modeltab"
          style={styles.profile}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
});

export default Header;
