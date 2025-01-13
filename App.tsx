import {View, StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store'; // Assuming you have a store file
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
