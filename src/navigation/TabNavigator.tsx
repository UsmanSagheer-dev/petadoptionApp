import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import ProfileScreen from '../screens/profilescreen/ProfileScreen';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import FavouriteScreen from '../screens/favouriteScreen/FavouriteScreen';
import HomeIcon from '../assets/svg/home.svg';
import SearchIcon from '../assets/svg/searchsvg.svg';
import ProfileIcon from '../assets/svg/profilesvg.svg';
import Favouriteicon from '../assets/svg/favouritesvg.svg';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent: any;
  
          if (route.name === 'Home') {
            IconComponent = HomeIcon;
          } else if (route.name === 'Profile') {
            IconComponent = ProfileIcon;
          } else if (route.name === 'Search') {
            IconComponent = SearchIcon;
          } else if (route.name === 'Favourite') {
            IconComponent = Favouriteicon;
          }

          return (
            <View
              style={{
                backgroundColor: focused ? 'black' : 'transparent', // Black background when focused
                borderRadius: 30, // Ensure the background is larger than the icon
                padding: 10, // Adjust size of the background circle
              }}
            >
              <IconComponent width={size} height={size} fill={focused ? color : 'gray'} />
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white', // You can customize the tab bar background here
          height: 60, // Adjust tab bar height if needed
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
