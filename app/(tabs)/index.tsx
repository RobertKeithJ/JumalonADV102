import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function HomeScreen() {

   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Robert Jumalon</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 35,
    fontFamily: "sans-serif",
    color: 'black',
    fontWeight: 800
  }
});
