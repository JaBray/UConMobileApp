
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// A SIMPLE BUTTON THAT DOES WHATEVER IS PASSED IN THE press PROPERTY
export default class MySmallButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.props.press} style={styles.touchable}>
            <Text style={styles.text}>{this.props.title}</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  touchable: {
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    padding: 12,
    borderRadius: 50,
    width: 100
  },
  text: {
    fontSize: 16,
    color: 'white'
  }
});
