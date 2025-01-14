import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profilescreen/ProfileScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profiles" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;