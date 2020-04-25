import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// CUSTOM FUNCTIONS
import { sendEmail } from '../functions/send_email.js';

// CUSTOM COMPONENTS
import MyLargeButton from './MyLargeButton';
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
        <MyLargeButton title="Send hard coded email" press={this._submitEmail}/>
      </View>
    );
  }

  //This method opens the phone's (default?) mail app to send an email....
  //  Concerns: 1. Am I allowed to copy and paste code from the internet like this?
  //            2. I can't fully test it on the emulator -- the button works, but I can't login to Gmail app.
  //            3. Is it okay with our customer to have it open a separate app?
  //             ..It probably shows the To: email address. Is this okay? (ContactInfo doesn't show it)
  //            4. Does it work if they don't use the default mail app? (I use Gmail instead of Mail on iOS)
  //  ...can we take out the Linking part to send email directly...?
  // example.js
  _submitEmail() {
      sendEmail(
          'ahawki18@emich.edu',
          'This is the subject',
          'this is the message hi hello',
          { cc: 'allison.c.hawk@gmail.com' }
      ).then(() => {
          console.log('Your message was successfully sent!');
      });
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

