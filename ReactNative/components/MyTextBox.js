import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// A SIMPLE TEXTBOX. IF THE SECURE PROPERTY IS TRUE THE INPUT WILL BE
// HIDDEN (PASSWORD FUNCTIONALITY).
// YOU CAN ALSO PASS PLACEHOLDER TEXT AND A DEFAULT VALUE.
export default class MyTextBox extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={this.props.placeholder}
          onChangeText={(text) => this._update(text)}
          value = {this.props.text}
          secureTextEntry = {this.props.secure}
        />
    </View>
  )};

  _update = (text) => {
    this.props.onchange(text)
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    height: 50,
    alignItems: 'center'
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 2,
    fontSize: 16,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 50,
    width: 300
  }
});
