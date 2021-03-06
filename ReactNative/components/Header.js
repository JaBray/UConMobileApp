import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// THE IMAGE THAT IS DISPLAYED BY ALL PAGE COMPONENTS
export default class Header extends Component {
  render() {
    return (
      <LinearGradient colors={['#34ccff', '#55dfd4', '#ebfa19']} style={styles.container}>
        <View >
          <Image source={require('../images/logo.png')} style={styles.logo} />
          <Text style={styles.header}>{this.props.title}</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    //height: 160,
    marginBottom: 25,
  },
  logo: {
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    resizeMode: 'contain'
  },
  header: {
    textAlign: 'center',
    marginTop: 5,
    color: '#ffffff',
    fontSize: 50,
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  },
});
