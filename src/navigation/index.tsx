import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import AuthNavigator from './AuthNavigator';
// import HomeScreen from '../screens/homeScreen/HomeScreen';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, View, Text } from 'react-native';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  function onAuthStateChanged(user) {
    console.log('Auth state changed:', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Initializing...</Text>
      </View>
    );
  }
  console.log("🚀 ~ RootNavigator ~ user:", user)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : user ? (
          // When the user is authenticated, go to AppNavigator
          <Stack.Screen
            name="App"
            component={AppNavigator}
            initialParams={{ user: user }} 
          
          />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
