import React, { Component } from 'react';
import { View, SectionList, SafeAreaView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from './Header';
import Event from './Event';
import MyLargeButton from './MyLargeButton';

// THIS IS A FULL PAGE COMPONENT WHICH DISPLAYS THE SCHEDULE SCREEN
export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this._parseSchedule();
    //const friday = this._getFriday();
    //const saturday = this._getSaturday();
    //const sunday = this._getSunday();
    // THE events STATE IS THE ARRAY OF EVENTS THAT IS PASSED TO THE FLATLIST
    this.state = { friday: [], saturday: [], sunday: [] };
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
          <Header title="Schedule"/>
          <SectionList
              sections={[
                  {title: 'FRIDAY', data: this.state.friday},
                  {title: 'SATURDAY', data: this.state.saturday},
                  {title: 'SUNDAY', data: this.state.sunday}
                ]}
              renderItem={({item}) =>
                <Event
                    title={item.title}
                    day={item.day}
                    time={item.time}
                    length={item.length}
                    gmName={item.gmName}
                    maxPlayers={item.maxPlayers}
                    experience={item.experience}
                    complex={item.complex}
                    room={item.room}
                  />}
              renderSectionHeader={({section}) =>
                <>
                  <Text style={styles.dayStyle}>{section.title}</Text>
                  <View style={styles.horizontalLineStyle}></View>
                </>}
              keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
      </View>
    );
  }

  _parseSchedule = async() => {
    const memberId = this.props.memberId;
    const eventsArray = await AsyncStorage.getItem(memberId)
      .then(events => {
        return JSON.parse(events);
      })
      .catch(error => {
        return [];
      });

      if (!Array.isArray(eventsArray)) {
        return;
      }

      let friday = [];
      let saturday = [];
      let sunday = [];
      for (const myEvent of eventsArray) {
        console.log(myEvent);
        switch (myEvent.day) {
          case 'FRI':
            friday.push(myEvent);
            break;
          case 'SAT':
            saturday.push(myEvent);
            break;
          case 'SUN':
            sunday.push(myEvent);
            break;
        }
      }

      this.setState({friday: friday, saturday: saturday, sunday: sunday});
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
    marginRight: 20,
    marginLeft: 10,
  },
  horizontalLineStyle: {
    borderBottomColor: '#3F3F3F',
    borderBottomWidth: 3,
    marginTop: 2,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 10,
  },
  button: {
    marginVertical:5
  }
});
