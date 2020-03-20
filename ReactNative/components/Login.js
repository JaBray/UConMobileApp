import React, { Component } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RSA } from 'react-native-rsa-native';
import { storeKeys } from '../functions/store_keys.js';
import { sendCredentials } from '../functions/authenticate.js';

import MyLargeButton from './MyLargeButton';
import MyTextBox from './MyTextBox';
import Header from './Header';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE LOGIN SCREEN
// THE USERNAME AND PASSWORD STATE VARIABLES ARE CHANGED WHEN THE TEXT BOXES
// ARE UPDATED.
export default class Login extends Component {
  constructor(props) {
    super(props);
    storeKeys();

    // THE AUTH_RESPONSE IS THE RESPONSE WHEN A USER ATTEMPTS TO AUTHENTICATE
    // (E.G. INVALID PASSWORD, CONNECTION ERROR, ETC.)
    // AUTHENTICATING IS A FLAG TO PREVENT MULTIPLE AUTHENTICATION ATTEMPTS IF
    // THE USER PRESSES THE BUTTON MULTIPLE TIMES
    this.state = { username: '', password: '', auth_response: '', authenticating: false};

    // THESE FUNCTIONS ARE PASSED TO THE TEXT BOX TO UPDATE THE STATE
    this._setUsername.bind(this);
    this._setPassword.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <MyTextBox placeholder='Username' secure={false} text={this.state.username} onchange={this._setUsername} />
        <MyTextBox placeholder='Password' secure={true} text={this.state.password} onchange={this._setPassword} />
        <MyLargeButton title="Login" press={this._sendCredentials} disabled={this.state.authenticating}/>
        <ActivityIndicator size="large" color="#0000ff" animating={this.state.authenticating} />
        <Text style={styles.authnResponse}>{this.state.auth_response}</Text>
      </View>
    );
  }

  _setUsername = (inputText) => {
    this.setState({username: inputText});
  }

  _setPassword = (inputText) => {
    this.setState({password: inputText});
  }

  // CALL API TO VALIDATE CREDENTIALS AND STORE TOKEN
  _sendCredentials = async () => {

    // DON'T SEND CREDENTIALS IF IN THE MIDDLE OF SENDING
    if (this.state.authenticating) {
      return;
    }

    // TURN ON SPINNER, RESET AUTHN RESPONSE TEXT
    this.setState({authenticating: true, auth_response: ''});

    // sendCredentials RETURNS EITHER A SUCCESS OR FAILURE OBJECT
    const response = await sendCredentials(this.state.username, this.state.password);

    if (response.error === true) {
      this.setState({authenticating: false, auth_response: response.message});
    } else {
      this.props.onLogin();
    }
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'flex-start',
   backgroundColor: 'white'
 },
 authnResponse: {
   margin: 15,
   fontSize: 16
 }
});
