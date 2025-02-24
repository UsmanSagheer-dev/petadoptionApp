import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './OnDividerStyles';

const OrDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>OR</Text>
      <View style={styles.line} />
    </View>
  );
};

export default OrDivider;
