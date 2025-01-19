import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { 
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer';
import { PlatformPressable } from '@react-navigation/elements';
import auth from '@react-native-firebase/auth';

// Import your screens
import HomeScreen from '../screens/homeScreen/HomeScreen';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import FavouriteScreen from '../screens/favouriteScreen/FavouriteScreen';
import ProfileScreen from '../screens/profilescreen/ProfileScreen';
import DotScreen from '../screens/dotScreen/DotScreen';
import SearchInput from '../components/searcInput/SearchInput';
type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  FavouriteTab: undefined;
  ProfileTab: undefined;
};
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.background }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined 
          ? options.tabBarLabel 
          : options.title !== undefined
          ? options.title 
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <PlatformPressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={styles.tabItem}>
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {typeof label === 'string' ? label : route.name}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const CustomDrawerContent: React.FC<any> = props => {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.error('Error signing out: ', error));
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.searchContainer}>
        <SearchInput />
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={SearchScreen}
        options={{ tabBarLabel: 'Search' }}
      />
      <Tab.Screen 
        name="FavouriteTab" 
        component={FavouriteScreen}
        options={{ tabBarLabel: 'Favourite' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 350,
        },
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={TabStack}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Donation"
        component={DotScreen}
        options={{
          drawerLabel: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    padding: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  searchContainer: {
    marginVertical: 10,
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  logoutText: {
    color: 'red',
  },
});

export default TabNavigator;