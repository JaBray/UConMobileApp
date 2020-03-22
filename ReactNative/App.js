import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

import Login from './components/Login';
import Schedule from './components/Schedule';

const Drawer = createDrawerNavigator();


export default class App extends Component {
  constructor() {
    super();

    // CHECK IF A USERNAME, PASSWORD, AND TOKEN IS ALREADY STORED.
    // IF SO, USER PREVIOUSLY AUTHENTICATED.
    // DOES NOT VERIFY THAT CREDENTIALS OR TOKEN ARE VALID.
    // THAT IS HANDLED WHEN THE TOKEN IS USED
    const authenticated = this._isAuthenticated();

    // THIS CONTROLS WHICH SET OF SCREENS TO SHOW.
    // THE UNAUTHENTICATED SCREENS (JUST LOGIN ATM) OR,
    // THE AUTHENTICATED SCREENS (JUST SCHEDULE ATM)
    this.state = {authenticated: authenticated, memberList: [], initialSchedule: []};

    // FUNCTIONS PASSED TO OTHER SCREENS WHICH ALLOWS THOSE SCREENS
    // TO UPDATE THE AUTHENTICATED STATE VARIABLE
    this._logout.bind(this);
    this._login.bind(this);
  }

  // NOTHING IS ACTUALLY RENDERED HERE. THIS JUST CONTROLS
  // WHICH SCREEN (OR SET OF SCREENS) WILL BE SHOWN.
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          {this.state.authenticated ? (
          <Drawer.Screen name="Schedule">
              {props => <Schedule {...props} onLogout={this._logout} memberList={this.state.memberList} initialSchedule={this.state.initialSchedule} />}
            </Drawer.Screen>
            ) : (
              <Drawer.Screen name="Login">
                {props => <Login {...props} onLogin={this._login} />}
              </Drawer.Screen>
            )}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  _login = (memberObject, firstMemberEvents) => {
    this.setState({memberList: memberObject, initialSchedule: firstMemberEvents, authenticated: true});
  }

  _logout = async () => {
    const keys = await AsyncStorage.getAllKeys()
    // const keys = ['username', 'password', 'token', 'members'];
    await AsyncStorage.multiRemove(keys);
    this.setState({authenticated: false});
  }

  _isAuthenticated = async () => {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.includes('username') && keys.includes('password') && keys.includes('token')) {
      return true;
    }
    return false;
  }
}
