import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from './AppStack';
import CustomDrawer from '../navigation/DrawerNavigation';
import DonateScreen from '../screens/donateScreen/DonateScreen';
import MyDonationScreen from '../screens/myDonationScreen/MyDonationScreen';
import { DrawerParamList } from '../types/navigation';
import PasswordUpdateScreen from '../screens/passwordUpdateScreen/PasswordUpdateScreen';

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
    </Drawer.Navigator>
  );
};

export default AppNavigator;