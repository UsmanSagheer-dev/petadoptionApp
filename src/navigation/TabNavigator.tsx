import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/homeScreen/HomeScreen';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import FavouriteScreen from '../screens/favouriteScreen/FavouriteScreen';
import ProfileScreen from '../screens/profilescreen/ProfileScreen';

type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  FavouriteTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBar: React.FC<any> = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.tabBar, { backgroundColor: colors.background }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <PlatformPressable key={route.key} onPress={onPress} style={styles.tabItem}>
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {typeof label === 'string' ? label : route.name}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home', tabBarIcon: () => <FontAwesome name="home" size={20} color={'black'} /> }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="FavouriteTab"
        component={FavouriteScreen}
        options={{ tabBarLabel: 'Favourite', tabBarIcon: ({ color, size }) => <FontAwesome name="heart" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: { flexDirection: 'row', padding: 10 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 },
});

export default TabNavigator;
