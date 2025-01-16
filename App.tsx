// import {View, StyleSheet} from 'react-native';
import 'react-native-gesture-handler'
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigation/index';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
// });
