import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../navigation/DrawerNavigation';
import { Screen } from '../constants/screen'; 
import { DrawerParamList } from '../types/types';
const Drawer = createDrawerNavigator<DrawerParamList>();
const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {Screen.map(screen => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default AppNavigator;