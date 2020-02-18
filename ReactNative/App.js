import React, { Component } from 'react';

{ /* IMPORTS FOR BUILT IN TAGS. ADD MORE IMPORTS IF YOU NEED DIFFERENT TAGS */ }
import { View, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RSA } from 'react-native-rsa-native';

{ /* IMPORTS FOR CUSTOM COMPONENTS.
 I PUT THEM IN A FOLDER NAME COMPONENTS.
 NOT POSITIVE IT'S STANDARD, BUT SEEMSED LIKE A GOOD IDEA */ }
import { MySmallButton } from './components/MySmallButton';
import { MyLargeButton } from './components/MyLargeButton';
import { MyTextBox } from './components/MyTextBox';

{ /* ALL COMPONENTS EXTEND THE COMPONENT CLASS
 THE COMPONENT IN THE APP.JS FILE IS THE MAIN COMPONENT
 TECHNICALLY YOU COULD WRITE THE ENTIRE APP IN THIS CLASS
 BUT IT'S TYPICAL TO BREAK IT UP INTO SEPARATE REUSABLE COMPONENT CLASSES
 ALL COMPONENT CLASSES HAVE A RENDER FUNCTION WHICH DECLARES WHAT THEY
 END UP COMPILING TO. */ }
export default class ButtonBasics extends Component {
  constructor() {
    super();
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

    this.state = { plaintext: '', encrypted: ''};
    this._setUsername.bind(this);
    this._encrypt.bind(this);
    this._store.bind(this);
    this._load.bind(this);
    this._decrypt.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('./images/logo.png')} style={styles.logo} />
        </View>
        <MyTextBox placeholder='My Secret' plaintext={this.state.plaintext} onchange={this._setUsername} />
        <View style={styles.buttonContainer}>
          <MySmallButton title="1. Encrypt" press={this._encrypt}/>
          <MySmallButton title="3. Load" press={this._load}/>
        </View>
        <View style={styles.buttonContainer}>
          <MySmallButton title="2. Store" press={this._store}/>
          <MySmallButton title="4. Decrypt" press={this._decrypt}/>
        </View>
          <MyLargeButton title="Call Sample API" press={this._callAPI}/>
          <Text style={styles.encrypted} textBreakStrategy='simple'>{this.state.encrypted}</Text>
      </View>
    );
  }

  _setUsername = (inputText) => {
    this.setState({plaintext: inputText});
  }

  _encrypt = async () => {
    const publicKey = await AsyncStorage.getItem('public');
    const encrypted = await RSA.encrypt(this.state.plaintext, publicKey);
    this.setState({plaintext: '', encrypted: encrypted});
  }

  _store = async () => {
    await AsyncStorage.setItem('encrypted', this.state.encrypted);
    this.setState({encrypted: ''});
  }

  _load  = async () => {
    const encrypted = await AsyncStorage.getItem('encrypted');
    this.setState({encrypted: encrypted});
  }

  _decrypt = async () => {
      const privateKey = await AsyncStorage.getItem('private');
      const encrypted = await AsyncStorage.getItem('encrypted');
      const decrypted = await RSA.decrypt(encrypted, privateKey);
      this.setState({plaintext: decrypted, encrypted: ''});
  }

  _callAPI = () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const body = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => response.text())
    .then(text => {
      alert(text);
    })
    .catch(error => {
      alert(error);
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
  logoContainer:{
    height: 150,
    backgroundColor: 'dodgerblue',
    marginBottom: 25
  },
  logo: {
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    resizeMode: 'contain'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  encrypted: {
    marginRight: 20,
    marginLeft: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: 'darkblue'
  }
});
