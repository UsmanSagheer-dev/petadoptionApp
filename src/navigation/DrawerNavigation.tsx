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
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MainStack')}>
          <Text style={styles.menuText}>Search for a pet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Adopt')}>
          <Text style={styles.menuText}>Adopt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Donate')}>
          <Text style={styles.menuText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddPet')}>
          <Text style={styles.menuText}>Add Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favorite')}>
          <Text style={styles.menuText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Message')}>
          <Text style={styles.menuText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutItem: {
    paddingVertical: 15,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
});

export default CustomDrawer;