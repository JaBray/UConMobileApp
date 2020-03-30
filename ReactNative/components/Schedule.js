import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from './Header';
import Event from './Event';
import MyLargeButton from './MyLargeButton';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE SCHEDULE SCREEN
export default class Schedule extends Component {
  constructor(props) {
    super(props);

    const events = this._getSchedule();
    // THE events STATE IS THE ARRAY OF EVENTS THAT IS PASSED TO THE FLATLIST
    this.state = { events: events };
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
            data={this.state.events}
            // add event properties inside <Event>
            renderItem={({item}) =>
            <Event
              title={item.title}
              day={item.day}
              time={item.time}
              e_time={item.e_time}
              s_fname={item.s_fname}
              s_lname={item.s_lname}
              i_maxplayers={item.i_maxplayers}
              e_exper={item.e_exper}
              e_complex={item.e_complex}
              s_room={item.s_room}
            />}
            keyExtractor={(item, index) => index.toString()}
          />
          <MyLargeButton title="Logout" press={this.props.onLogout}/>
        </SafeAreaView>
      </View>
    );
  }

  // PULL THE REQUESTED ARRAY OF EVENTS FROM STORAGE AND UPDATE THE COMPONENT STATE
  _getSchedule = async () => {
    const id = this.props.memberId;
    const events = JSON.parse(await AsyncStorage.getItem(id));
    this.setState({events: events});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
