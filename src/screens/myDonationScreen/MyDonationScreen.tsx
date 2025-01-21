import { View, Text,Alert } from 'react-native'
import React from 'react'
import CustomeHeader from '../../components/customeHeader/CustomeHeader'

const MyDonationScreen = () => {
  return (
    <View>
     <CustomeHeader 
  title="My Donations" 
  onPress={() => Alert.alert('Plus button clicked!')} 
/>
    </View>
  )
}

export default MyDonationScreen