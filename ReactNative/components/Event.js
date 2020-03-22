import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// THIS COMPONENT IS SUPPOSED TO SHOW THE SUMMARY OF A SINGLE EVENT
// IT IS BY THE SCHEDULE COMPONENT WHICH DISPLAYS A LIST OF THESE.
export default class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{this.props.title}</Text>
          <Text style={styles.text}>{this.props.day}</Text>
        </View>
        <Text style={styles.text}>{this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row'
  },
  container: {
    height: 120,
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
