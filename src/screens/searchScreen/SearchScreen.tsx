import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../../components/header/Header'
import SearchInput from '../../components/searcInput/SearchInput'

const SearchScreen = () => {
  return (
    <View style={styles.container}>
     <View>
      <Header/>
     </View>
     <View>
<SearchInput/>
     </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal:20,
  }
})
export default SearchScreen