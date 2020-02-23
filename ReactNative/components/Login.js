import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RSA } from 'react-native-rsa-native';

import { MyLargeButton } from './MyLargeButton';
import { MyTextBox } from './MyTextBox';
import { Header } from './Header';

export class Login extends Component {
  constructor(props) {
    super(props);
    this._storeKeys();

    this.state = { username: '', password: '', encrypted: ''};
    this._setUsername.bind(this);
    this._setPassword.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <MyTextBox placeholder='Username' secure={false} text={this.state.username} onchange={this._setUsername} />
        <MyTextBox placeholder='Password' secure={true} text={this.state.password} onchange={this._setPassword} />
        <MyLargeButton title="Login" press={this._authenticate}/>
      </View>
    );
  }

  _setUsername = (inputText) => {
    this.setState({username: inputText});
  }

  _setPassword = (inputText) => {
    this.setState({password: inputText});
  }

  _authenticate = () => {
    this._storeEncryptedCredentials();
    this._sendCredentials()
      .then(response => {
        if (response) {
          this.props.navigation.navigate('Schedule');
        } else {
          alert('Authentication error.');
        }
      });
  }

  _storeEncryptedCredentials = async () => {
      const publicKey = await AsyncStorage.getItem('public');
      const username = await RSA.encrypt(this.state.username, publicKey);
      const password = await RSA.encrypt(this.state.password, publicKey);
      await AsyncStorage.setItem('username', this.state.encrypted);
      await AsyncStorage.setItem('password', this.state.encrypted);
  }

  _sendCredentials = () => {
    if (this.state.username.length < 4 || this.state.password.length < 4) {
      return new Promise((resolve, reject) => {
        resolve(false);
      });
    }

    const url = 'https://jsonplaceholder.typicode.com/posts';
    const body = {
      username: this.state.username,
      password: this.state.password
    };

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => response.text())
    .then(text => {
      return true;
    })
    .catch(error => {
      alert(error);
      return false;
    });
  }

  _storeKeys = () => {
    AsyncStorage.setItem('public', `-----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1w8wVi2CKFeloC1yZrJo
      nCgbnLl9bjOBjZOQx2dSpJaCN8hUyrfMGeGS5vUBCnWaDHuMkwJHF4km6oXyn75p
      rT2/3mfGLNbBIZG2WbHNw07sdj6NHNoLG4tA91p9ZXiqDbu9xHRRFjxuRm6rESpF
      S/UPsrhtUIzXf9pkFcugo8J1wXXvxLEZmleHsYnR0rA8VKB1WSquAKYN+GCV+zMo
      KMN813lNAdE5ykYR4zpCU2qSzcFVbga+r57YjUEAqr3K4khh1RTnMfN5rJJYDWBw
      dMhPqqAuBc8AYUZ+0+r8Gmgtz8+ZM+FnZ/btyoHJ9K50Al9znDkLzRh2cZ0XSRkP
      bQIDAQAB
      -----END PUBLIC KEY-----`);
    AsyncStorage.setItem('private', `-----BEGIN RSA PRIVATE KEY-----
      MIIEpAIBAAKCAQEA1w8wVi2CKFeloC1yZrJonCgbnLl9bjOBjZOQx2dSpJaCN8hU
      yrfMGeGS5vUBCnWaDHuMkwJHF4km6oXyn75prT2/3mfGLNbBIZG2WbHNw07sdj6N
      HNoLG4tA91p9ZXiqDbu9xHRRFjxuRm6rESpFS/UPsrhtUIzXf9pkFcugo8J1wXXv
      xLEZmleHsYnR0rA8VKB1WSquAKYN+GCV+zMoKMN813lNAdE5ykYR4zpCU2qSzcFV
      bga+r57YjUEAqr3K4khh1RTnMfN5rJJYDWBwdMhPqqAuBc8AYUZ+0+r8Gmgtz8+Z
      M+FnZ/btyoHJ9K50Al9znDkLzRh2cZ0XSRkPbQIDAQABAoIBAQDUhPr0PlZ//VT7
      u81wdN9xaSUYNCkiTJ26xVdt5cnCQcV+0GYSSZzU+pfLydN0fZB0w2bAI6ETPgKK
      AUIo3+bYPswrQQuSZcpGnRLBAjbeyVBc7SVPnJ0bY/oYNYDzVFFf7uXxjCxRN/iV
      e2lrNgVysUIJD71euz995de/vhEJoSI04jcrP/t28yy+Swhy5Z66c+py3yp0K+mm
      391FxEiCYNX+2ehg1zV6b9aSEwx2cGnSvtGKmWszxkDIWgI+I2QMVK1JVPvoRRmo
      HivRMQlNUMjoIV1zna/S/mIwwiBqOAYyXVhb9JL+9zcrbkPMpBsIl8834a2T4c0N
      giOGIUKBAoGBAOqp81WQrOmuhtQWPuGp4DW1YZfVJcNUr1FcsviXwJm/tJPrdMuy
      iQFXaiaEuTy46UMmCapCzPV2weifu78SoxhK9pTbDS17okrO7skqR58g3y0UomT9
      pSRSmBdFxlALbZRbQCmdAPM5dThtD+onUa7b7LeHj2peBSPC9pIMU4ShAoGBAOqc
      7AV3b5yT+dQY7ohlkWjtAQPa//FTuOwiZeOqBBWPfJnDTq0KlTGNY7ZkoOVPgfpo
      JhRFKiY0bxu9NJNh63O+1WOyH1O9Js//+GUena8G/MariI98a8OeNJJ+qJk90JUr
      OndL2Pef3Mc3tHuzMdnhWDs98F6SoEpnWAQov0tNAoGBAMf2xno1bIM8y3vS8QaP
      IZXi2CTv5twKP9MPMRsRBXh+mbwquj4SBxlziesE0mxiDbPAqB/ECK9q4VX/N5dc
      pEpBJto1x4bogaVJrMUTGDELa+IYYUG5uo23LA840ALJmjj/gS90sKiSX8cTeKpJ
      kxt0IMVL6PP05mBQ9JgDlO/BAoGAC57GGec2gfzaTOUHO348W4QRns1EDAHnkNqL
      TWFoXmEC/OKtjOiPRysHm0sUpQbxGyP5btuWINpL/oW6iuo4rTzweMWjw5QEzhyR
      gwCnMroX3wcz9ldlRwUY+YCIfT6QjDLd7Ha3QlyKpNtfdxkDCRWeNyD0PNrqUYUY
      2OvjvakCgYBx5wehZABJKXXyX8ch3RaZ7c6xgjkryxtTyW2bdEgTija5VUvaiMwp
      ySz6YDTnZiLxvowiL/UFuERtGcsal1izKyflJKUlNVue4WAqVyqlnQIEg1TPjMeP
      FgCkaIn42YAYxpoHrN6gx5sEVCjxBZ4FjkU9DPL1ycivCFaaT5azQQ==
      -----END RSA PRIVATE KEY-----`);
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'flex-start',
   backgroundColor: 'white'
 }
});
