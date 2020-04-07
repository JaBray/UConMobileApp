import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

// CUSTOM FUNCTIONS
import { storeKeys } from './functions/store_keys.js';

// CUSTOM COMPONENTS
import Login from './components/Login';
import Schedule from './components/Schedule';
import ConductPolicy from './components/ConductPolicy';
import ContactInfo from './components/ContactInfo';
import ReportConductViolation from './components/ReportConductViolation';
import MyDrawerContent from './components/MyDrawerContent'
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
        <Drawer.Navigator
          drawerContent={props => <MyDrawerContent {...props} /> }
          drawerContentOptions={{
            labelStyle:  styles.labelStyle ,
            itemStyle: styles.itemStyle
          }}
          drawerStyle={styles.drawer}
          overlayColor='#FFFFFF80'
          initialRouteName="Login"
        >
          {this.state.authenticated ? (
            this.state.memberList.map(member => (
               <Drawer.Screen name={member[0]} key={member[0]} options={{ title: `Events: ${member[1]}` }} >
                 {props => <Schedule {...props} onLogout={this._logout} memberId={member[0]} />}
               </Drawer.Screen>
             ))
          ) : (
              <Drawer.Screen name="Login" options={{ title: 'Sign in' }} >
                {props => <Login {...props} onLogin={this._login} />}
              </Drawer.Screen>
            )
          }
          <Drawer.Screen name="Conduct Policy" component={ConductPolicy} />
          <Drawer.Screen name="Contact Info" component={ContactInfo} />
          <Drawer.Screen name="Report Conduct Violation" component={ReportConductViolation} />
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

const styles = StyleSheet.create({
  drawer: {
    marginTop: 15,
    marginBottom: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#333333EE'
  },
  labelStyle: {
    fontSize: 18,
    color: 'white'
  },
  itemStyle: {
    marginVertical: 5
  }
});
