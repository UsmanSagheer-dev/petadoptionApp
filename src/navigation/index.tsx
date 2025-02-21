import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, View, Text} from 'react-native';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import useAuth from '../hooks/useAuth';
const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  const {initializing, user, showSplash} = useAuth();

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Initializing...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      {showSplash ? (
        <SplashScreen />
      ) : user ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
