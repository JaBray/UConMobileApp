import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

// THE IMAGE THAT IS DISPLAED BY ALL PAGE COMPONENTS
export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: 150,
    backgroundColor: 'dodgerblue',
    marginBottom: 25
  },
  logo: {
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    resizeMode: 'contain'
  }
});
