import React, { Component } from 'react';
import { ScrollView, FlatList,SafeAreaView, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { sendCredentials } from '../functions/authenticate.js';
import { mockSchedule } from '../functions/mockSchedule.js';

import Header from './Header';
import Event from './Event';
import MyLargeButton from './MyLargeButton';
import MySmallButton from './MySmallButton';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE SCHEDULE SCREEN
export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this._logout.bind(this);

    // THE events STATE IS THE ARRAY OF EVENTS THAT IS PASSED TO THE FLATLIST
    // COMPONENT
    this.state = {players: [], events: []};
  }

  // WHEN THE PAGE RENDERS, ALL CALL IS MADE TO RETRIEVE THE SCHEDULE
  // THIS ISMOUNTED VARIABLE IS REQUIRED TO PREVENT THE COMPONENT FROM TRYING
  // TO SET THE EVENTS STATE WHEN THE APPLICATION LOADS
  componentDidMount() {
    this._isMounted = true;
    this._getSchedule();
  }

  // UNSET THE ISMOUNTED VARIABLE. NOT POSITIVE THIS IS REQUIRED
  componentWillUnmount() {
    this._isMounted = false;
  }

  // THE FLATLIST IS THE REAL ENGINE OF THIS VIEW. IT DISPLAYS A LIST OF
  // EVENT COMPONENTS. THE BUTTONS ARE A TEST TO MAKE SURE WE CAN CHANGE
  // WHAT LIST IS DISPLAYED BASED ON USER INPUT.
  // EACH TIME A BUTTON IS PRESSED, THE EVENTS FOR THE PROVIDED KEY
  // ARE PULLED FROM ASYNCSTORAGE AND THE events STATE IS UPDATED.
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Header />
          <FlatList
            data={this.state.players}
            renderItem={({item}) => <MyLargeButton title={item[1]} press={this._updateSchedule.bind(this, item[0])}/>}
            keyExtractor={(item, index) => index.toString()}
          />
          <FlatList
            data={this.state.events}
            renderItem={({item}) => <Event description={item.shorter} />}
            keyExtractor={(item, index) => index.toString()}
          />
          <MyLargeButton title="Logout" press={this._logout}/>
        </SafeAreaView>
      </View>
    );
  }

  // CLEAR STORED CREDENTIALS AND SET THE STATE OF THE APP TO UNAUTHENTICATED
  // THIS WILL DISPLAY THE LOGIN SCREEN
  _logout = async () => {
    const keys = ['username', 'password', 'token'];
    await AsyncStorage.multiRemove(keys)
    this.props.onLogout();
  }

  // PULL THE REQUESTED ARRAY OF EVENTS FROM STORAGE AND UPDATE THE COMPONENT STATE
  _updateSchedule = async (id) => {
    let events = JSON.parse(await AsyncStorage.getItem(id));
    if (this._isMounted) {
      this.setState({events: events});
    }
  }

  // CALLS THE API TO GET A LIST OF EVENTS. THESE ARE PARSED AND STORED
  // IN ASYNC STORAGE. THE USER ID WILL BE THE KEY AND THE VALUE WILL BE THE
  // SERIALIZED LIST OF JSON EVENTS
  _getSchedule = async () => {

    // GET TOKEN FROM STORAGE. IF MISSING SEND LOGOUT USER
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      this._logout();
    }

    // FETCH PARAMETERS
    const url = 'https://myfakeapi.com/api/cars/';

    // WRAP FETCH IN A TIMEOUT (5 SECONDS)
    let didTimeOut = false;
    new Promise(function(resolve, reject) {
      const timeout = setTimeout(function() {
          didTimeOut = true;
          reject(new Error('Request timed out'));
        }, 10000);

      // FETCH CALL
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`}
      })
      .then(response => {
        clearTimeout(timeout);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
    })
    .then(async response => {
      if (response.ok) {
        const responseText = await response.text();
        this._parseSchedule(responseText);
      } else if (response.status === 401) {
        this._processUnauthorized();
      } else {
        // COULD BE A 404 OR 500 OR OTHER
        this._processError(response.status);
      }
    })
    .catch(error => {
      this._processError(error);
    });
  } // END _getSchedule


  // TAKES THE SUCCESSFULL FETCH RESPONSE AND STORES THE KEY/VALUE PAIRS
  _parseSchedule = async (text) => {
    let response;
    try {
      response = JSON.parse(text);
    } catch (error) {
      // DISPLAY ERROR
    }
    const player_response = mockSchedule();
    let players = [];

    for (const player of player_response.players) {
      players.push([
          player.id_member,
          player.name
      ]);
      let events_string = JSON.stringify(player.events);
      await AsyncStorage.setItem(player.id_member, events_string);
    }

    this.state.players = players;
    players_string = JSON.stringify(players);
    await AsyncStorage.setItem('players', players_string);

    let player2_events = JSON.parse(await AsyncStorage.getItem('2'));

    if (this._isMounted) {
      this.setState({events: player2_events});
    }
  }

  _processUnauthorized = () => {
    // SEND USERNAME AND PASSWORD FOR ANOTHER TOKEN
    console.log('_processUnauthorized');
  }

  _processError = (error) => {
    // DISPLAY ERROR MESSAGE
    console.log(error);
  }

} // END CLASS

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
