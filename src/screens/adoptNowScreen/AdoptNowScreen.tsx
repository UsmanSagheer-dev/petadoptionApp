import {View, Text,StyleSheet} from 'react-native';
import React from 'react';
import COLOR from '../../constant/constant';
import ProfileCard from '../../components/profileCard/ProfileCard';

const AdoptNowScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Donation Request</Text>
      </View>
      <View>
      <ProfileCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:COLOR.white,
      paddingHorizontal: 17,

    },
    header: {
        fontSize: 24,
        fontWeight:700,
        marginTop: 30,
        fontFamily: 'MontserratRegular',
      },
});
export default AdoptNowScreen;
