import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { AppStackParamList } from '../types/navigation';
import PasswordUpdateScreen from '../screens/passwordUpdateScreen/PasswordUpdateScreen';
const Stack = createNativeStackNavigator<AppStackParamList>();
const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name='PasswordUpdate' component={PasswordUpdateScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;