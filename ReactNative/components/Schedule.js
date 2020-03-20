import React, { Component } from 'react';
import { ScrollView, FlatList,SafeAreaView, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { sendCredentials } from '../functions/authenticate.js';
import { getSchedule } from '../functions/get_schedule.js';

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
    this.state = {members: [], events: []};

  }

  // WHEN THE PAGE RENDERS, ALL CALL IS MADE TO RETRIEVE THE SCHEDULE
  // THIS ISMOUNTED VARIABLE IS REQUIRED TO PREVENT THE COMPONENT FROM TRYING
  // TO SET THE EVENTS STATE WHEN THE APPLICATION LOADS
  async componentDidMount() {
    this._isMounted = true;
    const startState = await this._intialize();
    this.setState({members: startState.members, events: startState.events})
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
            data={this.state.members}
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

  _intialize = async () => {
    const membersString =  await AsyncStorage.getItem('members');
    const memberObject = JSON.parse(membersString);
    const response = await getSchedule();
    const firstMemberId = response.message;
    const firstMemberEvents = await AsyncStorage.getItem(firstMemberId.toString());
    return {
      members: memberObject,
      events: firstMemberEvents
    };
  }

  // CLEAR STORED CREDENTIALS AND SET THE STATE OF THE APP TO UNAUTHENTICATED
  // THIS WILL DISPLAY THE LOGIN SCREEN
  _logout = async () => {
    const keys = ['username', 'password', 'token', 'members'];
    await AsyncStorage.multiRemove(keys);
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
      const response = await getSchedule();
      if (response.error) {
        // DO SOMETHING SMART
      } else {
        const firstMemberId = response.message;
        const firstMemberEvents = await AsyncStorage.getItem(firstMemberId.toString());
        console.log(firstMemberEvents);
        if (this._isMounted) {
          this.setState({events: firstMemberEvents});
        }
      }
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
