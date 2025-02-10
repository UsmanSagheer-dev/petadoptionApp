import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import SignUpScreen from '../screens/signUpScreen/SignUpScreen';
import RecoverPasswordScreen from '../screens/recoverPasswordScreen/RecoverPasswordScreen';
import PasswordUpdateScreen from '../screens/../screens/passwordUpdateScreen/PasswordUpdateScreen';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Recover" component={RecoverPasswordScreen} />
      <Stack.Screen name="PasswordUpdate" component={PasswordUpdateScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStack;