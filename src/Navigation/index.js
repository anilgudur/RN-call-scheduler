import { StackNavigator, SwitchNavigator } from 'react-navigation';
import CallListContainer from '../containers/Call/CallListContainer';
import AddCallContainer from '../containers/Call/AddCallContainer';
import RecurringContainer from '../containers/Call/RecurringContainer';

// import LoginScreen from '../containers/LoginScreen';
// import StartSessionScreen from '../containers/StartSessionScreen';
// import AuthWithSAML from '../containers/AuthWithSAML';
// import LobbyScreen from '../containers/LobbyScreen';
// import ForgotPassword from '../containers/ForgotPassword';
// import ChooseLoginScreen from '../containers/ChooseLoginContainer';

// import TaskList from '../Task/TaskList';
// import AddTaskContainer from '../Task/AddTaskContainer';
import TaskListContainer from '../containers/Task/TaskListContainer';
import AddTaskContainer from '../containers/Task/AddTaskContainer';
import * as css from "../Styles/Styles";

export const CallNavigation = {
  callListScreen: {
    id: 'CallListContainer',
    component: CallListContainer
  },
  addCallScreen: {
    id: 'AddCallContainer',
    component: AddCallContainer
  },
  recurringScreen: {
    id: 'RecurringContainer',
    component: RecurringContainer
  },

  // chooseScreen: {
  //   id: 'ChooseLoginScreen',
  //   component: ChooseLoginScreen,
  //   options: {
  //     header: null,
  //     gesturesEnabled: false,
  //   },
  // },
  // login: {
  //   id: 'Login',
  //   component: LoginScreen,
  //   options: {
  //     header: null,
  //     gesturesEnabled: false,
  //   },
  // },
  // startSession: {
  //   id: 'StartSessionScreen',
  //   component: StartSessionScreen,
  //   options: {
  //     header: null,
  //     gesturesEnabled: false,
  //   },
  // },
  // lobbyScreen: {
  //   id: 'LobbyScreen',
  //   component: LobbyScreen,
  //   options: {
  //     header: null,
  //     gesturesEnabled: false,
  //   },
  // },
  // authScreen: {
  //   id: 'AuthScreen',
  //   component: AuthWithSAML,
  //   options: {
  //     headerTitle: 'Authentication with SAML',
  //     gesturesEnabled: false,
  //   },
  // },
  // forgotPassword: {
  //   id: 'ForgotPassword',
  //   component: ForgotPassword,
  //   options: {
  //     headerTitle: 'Forgot Password',
  //   }
  // },

  taskListScreen: {
    id: 'TaskListContainer',
    component: TaskListContainer,
    options: {
      header: null,
      gesturesEnabled: false,
    },
  },
  addTaskScreen: {
    id: 'AddTaskContainer',
    component: AddTaskContainer,
    options: {
      header: null,
      gesturesEnabled: false,
    },
  }
};

export const AuthStack = StackNavigator({
  TaskListScreenRoute: {
    screen: CallNavigation.taskListScreen.component,
    navigationOptions: CallNavigation.taskListScreen.options,
  },
  // Login: {
  //   screen: CallNavigation.login.component,
  //   navigationOptions: CallNavigation.login.options,
  // },
  // AuthScreen: {
  //   screen: CallNavigation.authScreen.component,
  //   navigationOptions: CallNavigation.authScreen.options,
  // },
  // ForgotPassword: {
  //   screen: CallNavigation.forgotPassword.component,
  //   navigationOptions: CallNavigation.forgotPassword.options,
  // }
},
{
  initialRouteName: 'TaskListScreenRoute',
  //headerMode: 'screen'
});

export const AppStack = StackNavigator({
  CallListRoute: {
    screen: CallNavigation.callListScreen.component,
  },
  AddCallRoute: {
    screen: CallNavigation.addCallScreen.component,
  },
  RecurringRoute: {
    screen: CallNavigation.recurringScreen.component
  },

  // StartSessionScreen: {
  //   screen: CallNavigation.startSession.component,
  //   navigationOptions: CallNavigation.startSession.options,
  // },
  TaskListScreenRoute: {
    screen: CallNavigation.taskListScreen.component,
    //navigationOptions: CallNavigation.taskListScreen.options,
  },
  AddTaskScreenRoute: {
    screen: CallNavigation.addTaskScreen.component,
    //navigationOptions: CallNavigation.addTaskScreen.options,
  }
},
{
  initialRouteName: 'CallListRoute',
  navigationOptions: () => ({
    ...css.header
  }),
});

export const createRootNavigator = (isSignedIn = false) => {
  return SwitchNavigator({
    signed_in: AppStack,
    signed_out: AuthStack,
  },
  {
    initialRouteName: isSignedIn ? 'signed_in' : 'signed_out',
    /* The header config from HomeScreen is now here */
    navigationOptions: () => ({
      ...css.header
    }),
  });
};

// export const RootStack = StackNavigator(
//   {
//     Login: {
//       screen: CallNavigation.login.component,
//       navigationOptions: CallNavigation.login.options,
//     },
//     StartSessionScreen: {
//       screen: CallNavigation.startSession.component,
//       navigationOptions: CallNavigation.startSession.options,
//     },
//     LobbyScreen: {
//       screen: CallNavigation.lobbyScreen.component,
//       navigationOptions: CallNavigation.lobbyScreen.options,
//     },
//     WebScreen: {
//       screen: CallNavigation.webScreen.component,
//       navigationOptions: CallNavigation.webScreen.options,
//     },
//   },
//   {
//     initialRouteName: 'Login',
//     headerMode: 'screen'
//   }
// );