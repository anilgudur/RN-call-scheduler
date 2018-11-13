import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import TaskList from '../Task/TaskList';
import AddTaskScreen from '../Task/AddTaskScreen';

/**
 * Main Navigator Constant to show 'T&C' Or 'Drawer'
 * @param {*} isTnCAccepted - is Terms & Conditions Accepted
 */
const MainNav = (isTnCAccepted = false) => {
  return StackNavigator({
    TaskListRoute: { screen: TaskList, },
    AddTaskRoute: { screen: AddTaskScreen, }
  },
  {
      initialRouteName: isTnCAccepted ? 'TaskListRoute' : 'AddTaskRoute',
      navigationOptions: () => ({
          //...css.header
      }),
  });
};

/**
 * Root Navigator Component
 */
export default class RootNavigation extends Component {

  constructor(props) { // Added by Anil G on 03/08/2018
    super(props);
    console.log('this.props=>> ', this.props);
  }

  render() {

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!this.props.checkedRoot) {
      return null;
    }

    const AppNavigatorConst = MainNav(this.props.isTnCAccepted); // RootStackNavigator
    return (
      <AppNavigatorConst
        screenProps={this.props}
      />
    );

  }

}