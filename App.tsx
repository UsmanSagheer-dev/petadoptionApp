import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
// import LoginScreen from './src/screens/loginScreen/LoginScreen'
// import SignUpScreen from './src/screens/signUpScreen/SignUpScreen'
import RecoverPasswordScreen from './src/screens/recoverPasswordScreen/RecoverPasswordScreen'

const App = () => {
  return (
    <View style={styles.container}>
   {/* <LoginScreen/> */}
    {/* <SignUpScreen /> */}
    <RecoverPasswordScreen/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 27,
    justifyContent: 'center',
  },

})