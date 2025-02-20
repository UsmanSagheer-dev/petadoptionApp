import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/types';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/detailScreen/DetailScreen';
import PasswordUpdateScreen from '../screens/passwordUpdateScreen/PasswordUpdateScreen';
import MyDonationScreen from '../screens/myDonationScreen/MyDonationScreen';
import DonateScreen from '../screens/donateScreen/DonateScreen';
import AdoptNowScreen from '../screens/adoptNowScreen/AdoptNowScreen';
import ProfileScreen from '../screens/profilescreen/ProfileScreen';
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="PasswordUpdate" component={PasswordUpdateScreen} />
      <Stack.Screen name="MyDonationScreen" component={MyDonationScreen} />
      <Stack.Screen name="DonateScreen" component={DonateScreen} />
      <Stack.Screen name="AdoptNow" component={AdoptNowScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* <Stack.Screen name="DetailScreen" component={DetailScreen}/> */}
    </Stack.Navigator>
  );
};

export default AppStack;