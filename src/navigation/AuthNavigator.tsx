import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import SignUpScreen from '../screens/signUpScreen/SignUpScreen';
import RecoverPasswordScreen from '../screens/recoverPasswordScreen/RecoverPasswordScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Recover: undefined;
  Home: undefined; // Add your home screen here
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Recover" component={RecoverPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
