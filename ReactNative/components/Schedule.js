import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from './Header';
import { Event } from './Event';

export class Schedule extends Component {
  render() {
    return (
      <View>
        <Header />
        <View style={styles.container}>
          <Event title='Event 1' day='Friday, Nov 1' time='7pm'/>
          <Event title='Event 1' day='Friday, Nov 2' time='1pm'/>
          <Event title='Event 1' day='Friday, Nov 3' time='3pm'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
