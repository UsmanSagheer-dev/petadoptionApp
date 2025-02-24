import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PlatformPressable} from '@react-navigation/elements';
import {useTheme} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TabParamList} from '../types/types';
import {tabs} from '../constant/screen';
const Tab = createBottomTabNavigator<TabParamList>();
const CustomTabBar: React.FC<any> = ({state, descriptors, navigation}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.tabBar, {backgroundColor: colors.background}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const icon = options.tabBarIcon;

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
            onPress={onPress}
            style={styles.tabItem}>
            {icon &&
              icon({
                focused: isFocused,
                color: isFocused ? colors.primary : colors.text,
                size: 24,
              })}
            <Text
              style={[
                styles.label,
                {color: isFocused ? colors.primary : colors.text},
              ]}>
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
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({color, size}) => (
              <FontAwesome name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TabNavigator;
