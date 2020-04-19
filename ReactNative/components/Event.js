import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// THIS COMPONENT IS SUPPOSED TO SHOW THE SUMMARY OF A SINGLE EVENT
// IT IS THE SCHEDULE COMPONENT WHICH DISPLAYS A LIST OF THESE.

export default class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <LinearGradient colors={['#34ccff', '#55dfd4', '#ebfa19']} style={styles.linearGradient}>
          <Text style={styles.timeStyle}>{this.props.time}</Text>
        </LinearGradient>
        <View style={styles.horizontalLineStyle}></View>
        <Text style={styles.gameSubjectStyle}>{this.props.title}</Text>
        <Text style={styles.gameDescriptiontStyle}>
          GM: {this.props.s_fname} {this.props.s_lname}, {this.props.i_maxplayers}
          {" "}seats, {this.props.e_exper} {this.props.e_complex}
          {"\n"}{this.props.day} {this.props.time ? this.props.time.toLowerCase() : ''}-{this.props.e_time ? this.props.e_time.toLowerCase() : ''},
          {" "}{this.props.s_room}
        </Text>
        <LinearGradient colors={['#34ccff', '#55dfd4', '#ebfa19']} style={styles.linearGradient}>
          <Text style={styles.timeStyle}>{this.props.e_time}</Text>
        </LinearGradient>
        <View style={styles.horizontalLineStyle}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginRight: 10,
  },

  viewStyle: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  horizontalLineStyle: {
    borderBottomColor: '#3F3F3F',
    borderBottomWidth: 3,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
  },
  timeStyle: {
    fontSize:15,
    color: '#3F3F3F',
    fontWeight: 'bold',
  },
  gameSubjectStyle: {
    fontSize:20,
    color: '#3F3F3F',
    fontWeight: 'bold',
  },
  gameDescriptiontStyle: {
    fontSize: 15,
    color: '#3F3F3F',
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  blankStyle: {
    borderBottomColor: '#3F3F3F',
    borderBottomWidth: 1,
    marginHorizontal: 50,
    marginVertical: 20,
  },
});
