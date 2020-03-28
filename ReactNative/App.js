import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

// CUSTOM FUNCTIONS
import { storeKeys } from './functions/store_keys.js';

// CUSTOM COMPONENTS
import Login from './components/Login';
import Schedule from './components/Schedule';

const Drawer = createDrawerNavigator();

export default class App extends Component {
  constructor() {
    super();

    // GET ALL STORED ITEMS TO SEE IF KEYS STORED AND IF AUTHENTICATED
    const authenticated = this._setState();

    // THIS CONTROLS WHICH SET OF SCREENS TO SHOW.
    // THE UNAUTHENTICATED SCREENS (JUST LOGIN ATM) OR,
    // THE AUTHENTICATED SCREENS (JUST SCHEDULE ATM)
    this.state = { authenticated: authenticated, memberList: [] };

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
            this.state.memberList.map(member => (
               <Drawer.Screen name={member[1]}>
                 {props => <Schedule {...props} onLogout={this._logout} memberId={member[0]} />}
               </Drawer.Screen>
             ))
          ) : (
              <Drawer.Screen name="Login">
                {props => <Login {...props} onLogin={this._login} />}
              </Drawer.Screen>
            )
          }
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  // SETS THE AUTHENTICATED STATE TO TRUE
  // SETS THE MEMBERLIST TO AN ARRAY OF OBJECTS WITH MEMBER ID AND NAME
  // SETS THE INITIALSCHEDULE TO THE SCHEDULE OF THE FIRST USER
  _login = (memberObject, firstMemberEvents) => {
    this.setState({memberList: memberObject, initialSchedule: firstMemberEvents, authenticated: true});
  }

  // REMOVE ALL STORED INFORMATION EXCEPT THE PUBLIC AND PRIVATE KEYS USED
  // FOR ENCRYPTION. THIS IS DEPENDENT ON THE KEY NAMES USED IN THE
  // store_keys.js FILE
  _logout = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const filteredKeys = keys.filter(currentValue => {
      return currentValue !== 'public' && currentValue !== 'private';
    });

    await AsyncStorage.multiRemove(filteredKeys);
    this.setState({authenticated: false});
  }

  // GET ALL CURRENTLY STORED KEYS
  // IF ENCRYPTION KEYS ARE NOT STORED THEN STORE THEM
  // IF USERNAME, PASSWORD, AND TOKEN ARE NOT STORED, THEN NOT AUTHENTICATED
  _setState = () => {
    AsyncStorage.getAllKeys()
      .then(async (keys) => {
        if (!keys.includes('public') || !keys.includes('private')) {
          await this.storeKeys();
        }

        return (keys.includes('username') && keys.includes('password') && keys.includes('token'));
      })
      // IF THERE IS AN ERROR HERE, THEN SOMETHING IS WRONG. NOT SURE HOW TO RECOVER JUST YET.
      .catch(error => {
        return false;
      })
  }
}
