import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'types';
import {authRoutes} from '../constants/screen';
const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {authRoutes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
