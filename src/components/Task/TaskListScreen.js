import React, {Component } from 'react';
import { View, StyleSheet, FlatList, TouchableHighlight, Text, Switch, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import TaskRow from './TaskRow';
import { MenuIcon, MenuTitle } from "../../Header/Headers";
import { Icon } from 'react-native-elements';
import * as css from "../../Styles/Styles";

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

export default class TaskListScreen extends Component {

  // You can declare that a prop is a specific JS type.
  // static propTypes = {
  //   todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  //   onAddOpen: PropTypes.func.isRequired,
  // };
  static propTypes = {
    //screenProps: PropTypes.shape({
      todos: PropTypes.arrayOf(PropTypes.object).isRequired,
      //onAddOpen: PropTypes.func.isRequired,
      onDone: PropTypes.func.isRequired,
      filter: PropTypes.string.isRequired,
      onToggle: PropTypes.func.isRequired,
    //}).isRequired
  };

  constructor(props) {
    super(props);
    console.log('this.props=>> ', this.props);

    this.addTask = this.addTask.bind(this);
    //this.onDone = this.onDone.bind(this);
  }

  static navigationOptions = ({ navigation, screenProps }) => //(
  {
    const { navigate } = navigation;
    return {
      headerLeft: <MenuIcon
                      navigation={navigation}
                      onPress={() => navigate('DrawerOpen')}
                  />,
      headerTitle: <MenuTitle
                      navigation={navigation}
                      titleName={"Privacy Policy"}
                  />,
      headerRight: <Icon name="more-vert" color='white' size={20} />
    }
  };


  addTask() {
    console.log("Add pressed");
    //this.props.onAddOpen(this.props.navigation);
    //this.onAddOpen();
    this.props.navigation.navigate('AddTaskScreenRoute');
    //this.props.navigation.navigate('AddTaskRoute')
  }

  _keyExtractor_taskRow = (item, index) => index.toString();
  _renderItem_taskRow = ({ item, index }) => (
    <TaskRow
      id={index}
      index={index}
      item={item}
      onDone={this.props.onDone}
    />
  );

  onAddOpen() {
    this.props.navigation.navigate('AddTaskScreenRoute');
  }

  /*onAddPress(navigation, task) {
    // let todos = this.state.todos;
    // todos.push({task: task});
    // this.setState({
    //   todos: todos
    // });
    store.dispatch({
      type: 'ADD_TODO',
      task: task
    });
    console.log('A task was added: ', task);
    navigation.goBack();
  }

  onCancelPress(navigation) {
    navigation.goBack();
  }*/

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.toggleRow}>
          <Switch
            value={this.props.filter !== 'PENDING'}
            onValueChange={this.props.onToggle}
          />
          <Text style={styles.toggleText}>Showing {this.props.todos.length} {this.props.filter} todo(s)</Text>
        </View>

        <FlatList
          data={this.props.todos}
          extraData={this.props.extraData_todos}
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