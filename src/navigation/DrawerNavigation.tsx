import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out from Firebase!');
        GoogleSignin.signOut()
          .then(() => console.log('User signed out from Google!'))
          .catch(error => console.error('Google sign-out error: ', error));
      })
      .catch(error => console.error('Firebase sign-out error: ', error));
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.searchContainer}>
        {/* Add search input here if needed */}
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: { marginVertical: 10 },
  logoutButton: { marginTop: 20, marginHorizontal: 20 },
  logoutText: { color: 'red' },
});

export default CustomDrawer;
