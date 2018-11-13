import React, {Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  label: {
    fontSize: 20,
    fontWeight: '300'
  },
  doneButton: {
    borderRadius: 5,
    backgroundColor: '#EAEAEA',
    padding: 5,
  }
});

export default class TaskRow extends Component {

  static propTypes = {
    item: PropTypes.shape({
      task: PropTypes.string.isRequired,
    }).isRequired,
    onDone: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onDonePressed = this.onDonePressed.bind(this);
  }

  onDonePressed() {
    console.log('this.props.item: ', this.props.item);
    this.props.onDone(this.props.item);
  }

  render() {
    const item = this.props.item;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{item.task}</Text>
        <TouchableHighlight style={styles.doneButton} onPress={this.onDonePressed}>
          <Text>Done</Text>
        </TouchableHighlight>
      </View>
    )
  }
}