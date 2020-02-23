import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { View, Image, Text, StyleSheet } from 'react-native';


import { Login } from './components/Login';
import { Schedule } from './components/Schedule';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Schedule" component={Schedule} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
