import React from 'react';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DrawerParamList } from '../types/navigation';

const CustomDrawer = ({ navigation }: DrawerContentComponentProps) => {
  const handleLogout = () => {
    auth().signOut();
    GoogleSignin.signOut();
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('MainStack')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Donate')}>
          <Text>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyDonation')}>
          <Text>My Donations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  logout: { color: 'red', marginTop: 20 }
});

export default CustomDrawer;