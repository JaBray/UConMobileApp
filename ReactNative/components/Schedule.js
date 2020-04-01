import React, { Component } from 'react';
import { View, ScrollView, FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from './Header';
import Event from './Event';
import MyLargeButton from './MyLargeButton';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE SCHEDULE SCREEN
export default class Schedule extends Component {
  constructor(props) {
    super(props);

    const events = this._getSchedule();
    const friday = this._getFriday();
    const saturday = this._getSaturday();
    const sunday = this._getSunday();
    // THE events STATE IS THE ARRAY OF EVENTS THAT IS PASSED TO THE FLATLIST
    this.state = { events: events };
    this.setState({ scrollEnabled: false });
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
          <ScrollView style={styles.viewStyle}>

            <Text style={styles.dayStyle}> FRIDAY</Text>
            <FlatList
              scrollEnabled={this.state.scrollEnabled}
              data={this.state.friday}
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

            <Text style={styles.dayStyle}> SATURDAY</Text>
            <FlatList
              scrollEnabled={this.state.scrollEnabled}
              data={this.state.saturday}
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

            <Text style={styles.dayStyle}> SUNDAY</Text>
            <FlatList
              scrollEnabled={this.state.scrollEnabled}
              data={this.state.sunday}
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

            <MyLargeButton title="Logout" style={styles.button} press={this.props.onLogout}/>
          </ScrollView>
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
  //modified _getSchedule, deletes saturday and sunday events leaving only friday
  _getFriday = async () => {
    const id = this.props.memberId;
    const friday = JSON.parse(await AsyncStorage.getItem(id));
    for (var i = friday.length - 1; i >= 0; --i) {
      if (friday[i].day == "Saturday" || friday[i].day == "Sunday") {
          friday.splice(i,1);
      }
    }
    this.setState({friday: friday});
  }
  //saturday events
  _getSaturday = async () => {
    const id = this.props.memberId;
    const saturday = JSON.parse(await AsyncStorage.getItem(id));
    for (var i = saturday.length - 1; i >= 0; --i) {
      if (saturday[i].day == "Friday" || saturday[i].day == "Sunday") {
          saturday.splice(i,1);
      }
    }
    this.setState({saturday: saturday});
  }
  //sunday events
  _getSunday = async () => {
    const id = this.props.memberId;
    const sunday = JSON.parse(await AsyncStorage.getItem(id));
    for (var i = sunday.length - 1; i >= 0; --i) {
      if (sunday[i].day == "Saturday" || sunday[i].day == "Friday") {
          sunday.splice(i,1);
      }
    }
    this.setState({sunday: sunday});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  dayStyle: {
    marginHorizontal: 5,
    marginVertical:5,
    backgroundColor: '#3F3F3F',
    color: 'white',
    height: 40,
    fontSize:25,
    fontWeight: 'bold',
    marginRight: 5,
  },
  button: {
    marginVertical:5
  }
});
