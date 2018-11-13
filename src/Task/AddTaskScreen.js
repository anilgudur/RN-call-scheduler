import React, {Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from "react-native";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 150,
    backgroundColor: '#F7F7F7',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FAFAFA',
  },
  button: {
    height: 45,
    alignSelf: 'stretch',
    backgroundColor: '#05A5D1',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#666666',
  },

  label: {
    fontSize: 20,
    fontWeight: '300'
  }
});

export default class AddTaskScreen extends Component {

  static propTypes = {
    screenProps: PropTypes.shape({
      onAddPress: PropTypes.func.isRequired,
      onCancelPress: PropTypes.func.isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.onAddPress = this.onAddPress.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
  }

  onChange(text) {
    this.task = text;
  }

  onAddPress() {
    this.props.screenProps.onAddPress(this.props.navigation, this.task);
  }

  onCancelPress() {
    this.props.screenProps.onCancelPress(this.props.navigation);
  }

  render() {
    //const item = this.props.item;

    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input} 
          onChangeText={this.onChange.bind(this)} 
        />

        <TouchableHighlight style={styles.button} onPress={this.onAddPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.button, styles.cancelButton]} onPress={this.onCancelPress}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableHighlight>

      </View>
    )
  }
}