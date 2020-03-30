import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

// THIS COMPONENT IS SUPPOSED TO SHOW THE SUMMARY OF A SINGLE EVENT
// IT IS BY THE SCHEDULE COMPONENT WHICH DISPLAYS A LIST OF THESE.

export default class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <View style={styles.container}>
      //   <View style={styles.title}>
      //     <Text style={styles.text}>{this.props.title}</Text>
      //     <Text style={styles.text}>{this.props.day}</Text>
      //   </View>
      //   <Text style={styles.text}>{this.props.description}</Text>
      // </View>
      <ScrollView style={styles.viewStyle}>
        <Text style={styles.timeStyle}>{this.props.time}</Text>
        <View style={styles.horizontalLineStyle}></View>
        <Text style={styles.gameSubjectStyle}>{this.props.title}</Text>
        <Text style={styles.gameDescriptiontStyle}>
          GM: {this.props.s_fname} {this.props.s_lname}, {this.props.i_maxplayers}
          {" "}seats, {this.props.e_exper} {this.props.e_complex}
          {"\n"}{this.props.day} {this.props.time.toLowerCase()}-{this.props.e_time.toLowerCase()},
          {" "}{this.props.s_room}
        </Text>
        <Text style={styles.timeStyle}>{this.props.e_time}</Text>
        <View style={styles.horizontalLineStyle}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  // title: {
  //   flexDirection: 'row'
  // },
  // container: {
  //   height: 120,
  //   borderWidth: 2,
  //   borderColor: 'darkgreen',
  //   backgroundColor: 'lightblue',
  //   borderRadius: 5,
  //   marginLeft: 20,
  //   marginRight: 20,
  //   marginBottom: 15,
  //   padding: 5
  // },
  // text: {
  //   marginBottom: 5,
  //   fontSize: 16
  // }

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
