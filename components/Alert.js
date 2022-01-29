import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Alert({message}) {
  return (
    <View style={styles.container}>
      <Text >{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 35,
    backgroundColor: '#ffcdd2',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center',
  
  },
});
