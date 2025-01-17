import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { PlatformPressable } from '@react-navigation/elements';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import ProfileScreen from '../screens/profilescreen/ProfileScreen';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import FavouriteScreen from '../screens/favouriteScreen/FavouriteScreen';
import SearchInput from '../components/searcInput/SearchInput';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import DotScreen from '../screens/dotScreen/DotScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Logout Handler
const handleLogout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'))
    .catch(error => console.error('Error signing out: ', error));
};

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const { colors } = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      {/* SearchInput Component */}
      <View style={styles.searchContainer}>
        <SearchInput />
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={{ color: 'red' }}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

// Custom Tab Bar Component
const MyTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.background, padding: 10 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
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
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {typeof label === 'string' ? label : route.name}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

// Tab Screens Component
const TabScreens = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Search' }} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} options={{ tabBarLabel: 'Favourite' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 350,
          
        },
      }}
    >
      {/* Main Tabs */}
      <Drawer.Screen 
        name="MainTabs" 
        options={{
          drawerLabel: 'Home',
        }}
      >
        {() => (
          <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
            screenOptions={{
              headerShown: false,
            }}
          >
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
        )}
      </Drawer.Screen>

      {/* Additional Screens */}
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


export default TabNavigator;

// Styles
const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 10,
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
