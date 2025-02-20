import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from './AppStack';
import CustomDrawer from '../navigation/DrawerNavigation';
import DonateScreen from '../screens/donateScreen/DonateScreen';
import MyDonationScreen from '../screens/myDonationScreen/MyDonationScreen';
import { DrawerParamList } from '../types/types';
import PasswordUpdateScreen from '../screens/passwordUpdateScreen/PasswordUpdateScreen';
import AdoptNowScreen from '../screens/adoptNowScreen/AdoptNowScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="MainStack" component={AppStack} />
      <Drawer.Screen name="Donate" component={DonateScreen} />
      <Drawer.Screen name="MyDonation" component={MyDonationScreen} />
      <Drawer.Screen name='PasswordUpdate' component={PasswordUpdateScreen}/>
      <Drawer.Screen name='AdoptNow' component={AdoptNowScreen}/>
    </Drawer.Navigator>
  );
};

export default AppNavigator;