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

    const events = props.initialSchedule ? props.initialSchedule : [];
    // THE events STATE IS THE ARRAY OF EVENTS THAT IS PASSED TO THE FLATLIST
    this.state = {members: props.memberList, events: events};
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
            renderItem={({item}) => <Event description={item.shorter} day={item.day} title={item.title}/>}
            keyExtractor={(item, index) => index.toString()}
          />
          <MyLargeButton title="Logout" press={this.props.onLogout}/>
        </SafeAreaView>
      </View>
    );
  }

  // PULL THE REQUESTED ARRAY OF EVENTS FROM STORAGE AND UPDATE THE COMPONENT STATE
  _updateSchedule = async (id) => {
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
