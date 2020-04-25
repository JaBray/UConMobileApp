import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from './Header';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE CONDUCT POLICY SCREEN
export default class ContactInfo extends Component {
  constructor(props) {
    super(props);
  }

// TODO: add email fields and functionality
// ...Need FROM email (so staff can reply) -- get from user info (username)?,, but also want this page available when logged out.
  render() {
    return (
      <View style={styles.container}>
        <Header title="Contact Info"/>
        <Text style={styles.heading}>Contact by Postal Mail</Text>
        <Text style={styles.text}>Please label as ATN: Vendors Coordinator, ATN: Events Coordinator, or ATN: Volunteer Coordinator as appropriate.</Text>
        <Text style={styles.text}>U-Con Gaming Club{"\n"}P.O. Box 130242{"\n"}Ann Arbor, MI 48131-0242</Text>
        <Text style={styles.heading}>Contact by Email</Text>
        <Text style={styles.text}>((email text boxes))</Text>
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

