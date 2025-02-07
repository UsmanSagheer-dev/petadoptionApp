import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import PasswordUpdateScreen from '../screens/passwordUpdateScreen/PasswordUpdateScreen';
import DonateScreen from '../screens/donateScreen/DonateScreen';
import DetailScreen from '../screens/detailScreen/DetailScreen';
import CustomDrawer from '../navigation/DrawerNavigation'; // Custom Drawer Component
import MyDonationScreen from '../screens/myDonationScreen/MyDonationScreen';
import { AppStackParamList } from '../types/navigation';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<AppStackParamList>();

// ✅ StackNavigator (Tabs & Other Screens)
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="PasswordUpdate" component={PasswordUpdateScreen} />

      <Stack.Screen name="DonateScreen" component={DonateScreen} />
    </Stack.Navigator>
  );
};

// ✅ DrawerNavigator (Main Navigation)
const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />} // Custom Drawer Content
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{drawerLabel: 'Home'}}
      />
      <Drawer.Screen
        name="DonateScreen"
        component={DonateScreen}
        options={{drawerLabel: 'Donate'}}
      />
      <Drawer.Screen
        name="My Donation"
        component={MyDonationScreen}
        options={{drawerLabel: 'My Donation'}}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
