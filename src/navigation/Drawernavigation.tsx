import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Button} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ProfileScreen from '../screens/profilescreen/ProfileScreen';
import TabNavigator from './TabNavigator';

function NotificationsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Go back home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
