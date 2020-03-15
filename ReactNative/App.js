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
    const authenticated = this._isAuthenticated();
    this.state = {authenticated: authenticated};
    this._logout.bind(this);
    this._login.bind(this);
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          {this.state.authenticated ? (
            <Drawer.Screen name="Schedule">
              {props => <Schedule {...props} onLogout={this._logout} />}
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

  _login = () => {
    this.setState({authenticated: true});
  }

  _logout = () => {
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
