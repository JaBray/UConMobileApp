import React, { Component } from 'react';
import { ScrollView, FlatList,SafeAreaView, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from './Header';
import { Event } from './Event';
import { MyLargeButton } from './MyLargeButton';


// <ScrollView style={styles.container}>
//   <Event title='Event 1' day='Friday, Nov 1' time='7pm'/>
//   <Event title='Event 2' day='Saturday, Nov 2' time='1pm'/>
//   <Event title='Event 3' day='Saturday, Nov 2' time='3pm'/>
//   <Event title='Event 4' day='Sunday, Nov 3' time='3pm'/>
//   <Event title='Event 5' day='Sunday, Nov 3' time='5pm'/>
//   <MyLargeButton title="Logout" press={this._logout}/>
// </ScrollView>

// {this.state.events.map((event, i) => (
//   <Event title={event.car} day={event.car_model} time={event.price}/>
// ))}

export class Schedule extends Component {
  constructor(props) {
    super(props);
    this._logout.bind(this);
    this.state = {events: []};
  }

  componentDidMount() {
    this._isMounted = true;
    this._getSchedule();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Header />
          <FlatList
            data={this.state.events}
            renderItem={({item}) => <Event title={item.make} day={item.model} time={item.color} />}
            keyExtractor={(item, index) => index.toString()}
          />
          <MyLargeButton title="Logout" press={this._logout}/>
        </SafeAreaView>
      </View>
    );
  }

  _logout = async () => {
    const keys = ['username', 'password', 'token'];
    await AsyncStorage.multiRemove(keys)
    this.props.onLogout();
  }

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

  _parseSchedule = async (text) => {
    let response;
    try {
      response = JSON.parse(text);
    } catch (error) {
      // DISPLAY ERROR
    }
    const events = response.cars.slice(0, 10);
    const eventsObject = events.map((car) => {
      return {
        make: car.car,
        model: car.car_model,
        color: car.car_color
      }
    });

    for (const car of eventsObject) {
      let car_string = JSON.stringify(car);
      await AsyncStorage.setItem(car.make, car_string);
    }

    let a_car = JSON.parse(await AsyncStorage.getItem('Mitsubishi'));
    let car_array = [];

    car_array.push(a_car);

    console.log(car_array);
    if (this._isMounted) {
      this.setState({events: car_array});
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
  }
});
