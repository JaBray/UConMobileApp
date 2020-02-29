import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from './Header';
import { Event } from './Event';
import { MyLargeButton } from './MyLargeButton';

export class Schedule extends Component {
  constructor(props) {
    super(props);
    this._logout.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.container}>
          <Event title='Event 1' day='Friday, Nov 1' time='7pm'/>
          <Event title='Event 2' day='Saturday, Nov 2' time='1pm'/>
          <Event title='Event 3' day='Saturday, Nov 2' time='3pm'/>
          <Event title='Event 4' day='Sunday, Nov 3' time='3pm'/>
          <Event title='Event 5' day='Sunday, Nov 3' time='5pm'/>
          <MyLargeButton title="Logout" press={this._logout}/>
        </ScrollView>
      </View>
    );
  }

  _logout = async () => {
    const keys = ['username', 'password', 'token'];
    await AsyncStorage.multiRemove(keys)
    this.props.onLogout();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
