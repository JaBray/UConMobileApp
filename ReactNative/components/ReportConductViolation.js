import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// CUSTOM FUNCTIONS
import { sendEmail } from '../functions/send_email.js';
const EmailTo = 'ahawki18@emich.edu';
const EmailSubject = 'Conduct Violation Report';

// CUSTOM COMPONENTS
import MyTextBox from './MyTextBox';
import MyLargeTextBox from './MyLargeTextBox';
import MyLargeButton from './MyLargeButton';
import Header from './Header';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE CONDUCT POLICY SCREEN
export default class ReportConductViolation extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', phone: '', details: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <Header title="Report Conduct Violation"/>
            <Text style={styles.text}>Please fill the following fields to report a conduct violation.</Text>
            <Text style={styles.text}>Name:</Text>
            <MyTextBox placeholder='Name' text={this.state.name} onchange={this._setName} />
            <Text style={styles.text}>Phone Number:</Text>
            <MyTextBox placeholder='Phone Number' text={this.state.phone} onchange={this._setPhone} />
            <Text style={styles.text}>Details of conduct violation, including names, times, location:</Text>
            <MyLargeTextBox placeholder='Details of conduct violation, including names, times, location' text={this.state.details} onchange={this._setDetails} />
            <MyLargeButton title="Submit Report Via Email" press={() => this._submitEmail(this.state.details, this.state.name, this.state.phone)}/>
        </ScrollView>
      </View>
    );
  }

  _setName = (inputText) => {
      this.setState({name: inputText});
  }
  _setPhone = (inputText) => {
      this.setState({phone: inputText});
  }
  _setDetails = (inputText) => {
      this.setState({details: inputText});
  }

  // OPEN A MAIL CLIENT TO PREFILL AN EMAIL WITH THESE CONTENTS
  _submitEmail = (details, name, phone) => {
      let emailMessage = details + '\n\n' + name + '\n' + phone;

      sendEmail(
          EmailTo,
          EmailSubject,
          emailMessage
      ).then(() => {
          console.log(emailMessage);
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

