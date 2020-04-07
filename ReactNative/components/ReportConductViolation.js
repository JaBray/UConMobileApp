import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from './Header';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE CONDUCT POLICY SCREEN
export default class ReportConductViolation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
         <Header title="Report Conduct Violation"/>
        <Text style={styles.text}>words go here</Text>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
 },
  heading: {
    margin: 15,
    marginBottom: 0,
    fontSize: 26,
    fontWeight: "bold"
 },
  text: {
    margin: 15,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16
  },
  boldtext: {
    margin: 15,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold"
  }
});

