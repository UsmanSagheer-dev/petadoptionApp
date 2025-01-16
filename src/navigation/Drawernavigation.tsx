import * as React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define the types for the screens in the drawer
type RootDrawerParamList = {
  Home: undefined;
  Notifications: undefined;
};

// Define the drawer navigator
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function HomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Home'>>(); // Typing here

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate('Notifications')}> {/* Navigation works now */}
        Go to notifications
      </Button>
    </View>
  );
}

function NotificationsScreen() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Notifications'>>(); // Typing here

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>
        Go back home
      </Button>
    </View>
  );
}

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
