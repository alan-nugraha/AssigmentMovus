import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#07A9F0" />
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
