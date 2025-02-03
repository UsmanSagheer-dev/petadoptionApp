import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { AppStackParamList } from '../types/navigation';
import PasswordUpdateScreen from '../screens/passwordUpdateScreen/PasswordUpdateScreen';
import DonateScreen from '../screens/donateScreen/DonateScreen';
const Stack = createNativeStackNavigator<AppStackParamList>();
const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name='PasswordUpdate' component={PasswordUpdateScreen} />
      <Stack.Screen name='DonateScreen' component={DonateScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;