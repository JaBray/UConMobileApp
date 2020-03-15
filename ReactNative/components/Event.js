import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Event extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Make: {this.props.title}</Text>
        <Text style={styles.text}>Model: {this.props.day}</Text>
        <Text style={styles.text}>Color: {this.props.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 95,
    borderWidth: 2,
    borderColor: 'darkgreen',
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    padding: 5
  },
  text: {
    marginBottom: 5,
    fontSize: 16
  }
});
