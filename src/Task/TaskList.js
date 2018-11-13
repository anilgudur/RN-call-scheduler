import React, {Component } from 'react';
import { View, StyleSheet, FlatList, TouchableHighlight, Text, Switch } from "react-native";
import PropTypes from 'prop-types';
import TaskRow from './TaskRow';

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#f7f7f7',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    padding: 10,
  },
  toggleText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 3,
  }
});

export default class TaskList extends Component {

  // You can declare that a prop is a specific JS type.
  // static propTypes = {
  //   todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  //   onAddOpen: PropTypes.func.isRequired,
  // };
  static propTypes = {
    screenProps: PropTypes.shape({
      todos: PropTypes.arrayOf(PropTypes.object).isRequired,
      onAddOpen: PropTypes.func.isRequired,
      onDone: PropTypes.func.isRequired,
      filter: PropTypes.string.isRequired,
      onToggle: PropTypes.func.isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);
    console.log('this.props.screenProps=>> ', this.props);

    this.addTask = this.addTask.bind(this);
  }

  addTask() {
    console.log("Add pressed");
    this.props.screenProps.onAddOpen(this.props.navigation);
    //this.props.navigation.navigate('AddTaskRoute')
  }

  _keyExtractor_taskRow = (item, index) => index.toString();
  _renderItem_taskRow = ({ item, index }) => (
    <TaskRow
      id={index}
      index={index}
      item={item}
      onDone={this.props.screenProps.onDone}
    />
  );

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.toggleRow}>
          <Switch
            value={this.props.screenProps.filter !== 'PENDING'}
            onValueChange={this.props.screenProps.onToggle}
          />
          <Text style={styles.toggleText}>Showing {this.props.screenProps.todos.length} {this.props.screenProps.filter} todo(s)</Text>
        </View>

        <FlatList
          data={this.props.screenProps.todos}
          extraData={this.props.screenProps.extraData_todos}
          keyExtractor={this._keyExtractor_taskRow}
          renderItem={this._renderItem_taskRow}
        />

        <TouchableHighlight
          onPress={this.addTask}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add One</Text>
        </TouchableHighlight>
      </View>
    )
  }
}



