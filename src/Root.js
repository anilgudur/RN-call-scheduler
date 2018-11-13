import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
//import SplashScreen from 'react-native-splash-screen';

import { Application } from './containers';
import getStore from './store';
//import { prepareUserData } from './utils/prepareUserUtils';

//console.disableYellowBox = true;

export default class Root extends PureComponent {
  constructor() {
    super();

    this.store = null;
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this._getGlobalStore();
  }

  _getGlobalStore = async () => {
    this.store = await getStore();
    console.log('this.store: ', this.store);
    console.log('this.store.getState().user: ', this.store.getState().user);
    console.log('this.store.getState().task: ', this.store.getState().task);
    //await prepareUserData(this.store);
    //this.setState({ loading: false, ...this.store.getState(), }); //SplashScreen.hide();
    this.setState({ loading: false }); //SplashScreen.hide();
  }


  // Start: OLD
  /*
  onAddOpen(navigation) {
    console.log("On Add..");
    console.log("this.props:: ", this.props);
    console.log('navigation: ', navigation);
    navigation.navigate('AddTaskRoute');
    // Alert.alert(
    //     'Remote Configure',
    //     'Accept Remote Configure from ?',
    //     [
    //       { text: 'Cancel', onPress: () => { }, style: 'cancel' },
    //       {
    //         text: 'OK', onPress: () => {
    //         }
    //       },
    //     ],
    //     { cancelable: false }
    // );
  }

  onAddPress(navigation, task) {
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
  }

  onDone(todo) {
    console.log("onDone pressed: ", todo);
    // let filteredTodos = this.state.todos.filter((fTodo) => {
    //   return fTodo !== todo; 
    // });
    // this.setState({ todos: filteredTodos });
    store.dispatch({
      type: 'DONE_TODO',
      todo: todo,
    });
  }

  onToggle() {
    store.dispatch({
      type: 'TOGGLE_STATE',
    });
  }
  */
  // End: OLD

  render() {
    return (
      !this.state.loading &&
      <Provider store={this.store}>
        <Application
          initialUser={this.store.getState().user}

          // checkedRoot={this.state.checkedRoot}
          // isTnCAccepted={this.state.isTnCAccepted}

          // todos={this.state.todos}
          // extraData_todos={this.state.extraData_todos}
          // onAddOpen={this.onAddOpen.bind(this)}
          // onAddPress={this.onAddPress.bind(this)}
          // onCancelPress={this.onCancelPress.bind(this)}
          // onDone={this.onDone.bind(this)}
          // filter={this.state.filter}
          // onToggle={this.onToggle.bind(this)}
        />
      </Provider>
    );
  }
}