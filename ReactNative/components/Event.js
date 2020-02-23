import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class Event extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
        <Text style={styles.text}>Day: {this.props.day}</Text>
        <Text style={styles.text}>Time: {this.props.time}</Text>
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
