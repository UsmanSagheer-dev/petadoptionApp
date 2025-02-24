import AppStack from '../navigation/AppStack'; 
import DonateScreen from '../screens/donateScreen/DonateScreen';
import MyDonationScreen from '../screens/myDonationScreen/MyDonationScreen';
import PasswordUpdateScreen from '../screens/passwordUpdateScreen/PasswordUpdateScreen';
import AdoptNowScreen from '../screens/adoptNowScreen/AdoptNowScreen';
import { DrawerParamList,ScreenConfig,TabConfig } from '../types/types';
import DetailScreen from '../screens/detailScreen/DetailScreen';
import TabNavigator from '../navigation/TabNavigator';
import ProfileScreen from '../screens/profilescreen/ProfileScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import FavouriteScreen from '../screens/favouriteScreen/FavouriteScreen';
export const Screen: { name: keyof DrawerParamList; component: React.ComponentType<any> }[] = [
  { name: 'MainStack', component: AppStack },
  { name: 'Donate', component: DonateScreen },
  { name: 'MyDonation', component: MyDonationScreen },
  { name: 'PasswordUpdate', component: PasswordUpdateScreen },
  { name: 'AdoptNow', component: AdoptNowScreen },
];


export const menuItems = [
    { label: 'Home', route: 'MainStack' },
    { label: 'Donate', route: 'Donate' },
    { label: 'My Donations', route: 'MyDonation' },
    { label: 'PasswordUpdate', route: 'PasswordUpdate' },
    { label: 'Adopt Now', route: 'AdoptNow' },
  ];

import LoginScreen from '../screens/loginScreen/LoginScreen';
import SignUpScreen from '../screens/signUpScreen/SignUpScreen';
import RecoverPasswordScreen from '../screens/recoverPasswordScreen/RecoverPasswordScreen';
import AppNavigator from '../navigation/AppNavigator';

export const authRoutes = [
  { name: 'Login', component: LoginScreen },
  { name: 'SignUp', component: SignUpScreen },
  { name: 'Recover', component: RecoverPasswordScreen },
  { name: 'PasswordUpdate', component: PasswordUpdateScreen },
  { name: 'App', component: AppNavigator },
] as const;


export const AppScreens: ScreenConfig[] = [
  { name: 'Main', component: TabNavigator },
  { name: 'Detail', component: DetailScreen },
  { name: 'PasswordUpdate', component: PasswordUpdateScreen },
  { name: 'MyDonationScreen', component: MyDonationScreen },
  { name: 'DonateScreen', component: DonateScreen },
  { name: 'AdoptNow', component: AdoptNowScreen },
  { name: 'ProfileScreen', component: ProfileScreen },
  { name: 'SearchScreen', component: SearchScreen },
];

export const tabs: TabConfig[] = [
  {
    name: 'HomeTab',
    component: HomeScreen,
    label: 'Home',
    icon: 'home',
  },
  {
    name: 'SearchTab',
    component: SearchScreen,
    label: 'Search',
    icon: 'search',
  },
  {
    name: 'FavouriteTab',
    component: FavouriteScreen,
    label: 'Favorites',
    icon: 'heart',
  },
  {
    name: 'ProfileTab',
    component: ProfileScreen,
    label: 'Profile',
    icon: 'user',
  },
];
