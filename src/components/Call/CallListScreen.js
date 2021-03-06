import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import { MenuIcon, MenuTitle } from "../../Header/Headers";
import { Icon, FormValidationMessage } from "react-native-elements";
import {
  addCallScreen as styles,
  colors as stylesColors,
  global as gStyle,
  tabs as tabsStyle,
  colors as colorsStyle,
  values as styleValues
} from "../../Styles/Styles";
import moment from "moment";
import { I18n } from "react-redux-i18n";
import CallDateRow from "./CallDateRow";
import { appConsts } from "../../constants";
const {
  callColorOptions,
  rdOptionRecurring,
  rdOptionRecurringEndDate
} = appConsts;
import { TabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import CallService from "../../Services/CallService";

import UpcomingCallsTabScreen from "./CallListType/UpcomingCallsTabScreen";
import OldCallsTabScreen from "./CallListType/OldCallsTabScreen";
import RecurringCallsTabScreen from "./CallListType/RecurringCallsTabScreen";
import CompletedCallsTabScreen from "./CallListType/CompletedCallsTabScreen";
import Touchable from "react-native-platform-touchable";
import { LoadingComponent } from "../CommonComponents/CommonComponents";

const stringifyObject = require("stringify-object");

const CallsTab = TabNavigator(
  {
    UpcomingCallsTabRoute: {
      screen: UpcomingCallsTabScreen
    },
    OldCallsTabRoute: {
      screen: OldCallsTabScreen
    },
    RecurringCallsTabRoute: {
      screen: RecurringCallsTabScreen
    },
    CompletedCallsTabRoute: {
      screen: CompletedCallsTabScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      // tabBarIcon: ({ focused }) => {
      //   const { routeName } = navigation.state;
      //   let iconName;
      //   switch (routeName) {
      //     case 'Home':
      //       iconName = Platform.OS === 'ios'
      //         ? `ios-information-circle${focused ? '' : '-outline'}`
      //         : 'md-information-circle';
      //       break;
      //     case 'Links':
      //       iconName = Platform.OS === 'ios'
      //         ? `ios-link${focused ? '' : '-outline'}`
      //         : 'md-link';
      //       break;
      //     case 'Settings':
      //       iconName = Platform.OS === 'ios'
      //         ? `ios-options${focused ? '' : '-outline'}`
      //         : 'md-options';
      //   }
      //   return (
      //     <Ionicons
      //       name={iconName}
      //       size={28}
      //       style={{ marginBottom: -3 }}
      //       color={focused ? colorsStyle.tabIconSelected : colorsStyle.tabIconDefault}
      //     />
      //   );
      // },
    }),
    tabBarPosition: "top",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "#DDDDDD",
      labelStyle: {
        fontFamily: styleValues.roboto_regular,
        fontSize: 12,
        margin: 0,
        padding: 0,
        lineHeight: 30
      },
      style: {
        backgroundColor: "#3498DB"
      }
    }
  }
);

export default class CallListScreen extends Component {
  static propTypes = {
    //screenProps: PropTypes.shape({
    onAddPress: PropTypes.func.isRequired
    //}).isRequired
  };

  constructor(props) {
    super(props);
    //console.log("this.props CallListScreen =>> ", this.props);

    this.state = {
      isLoaded: true,

      contactName: "",
      phoneNumber: "",
      date: new Date(),
      // recurring: {
      //   on: 'DO_NOT_REPEAT',
      //   endDate: null,
      // },
      color: "white",
      extraData_callColors: false,
      note: "",

      isFocusedContactName: false,
      isFocusedPhoneNumber: false,
      isFocusedDate: false,
      isFocusedTime: false,
      isFocusedNote: false,

      phoneNumber_error: false,

      phoneNumber_error_message: "",

      sendProps: {}

      // sendProps: {
      //   upcomingArr: [
      //     {
      //       color_type_id: 1,
      //       contact_name: "Anil",
      //       generatedScheduleDate: 'Mon Dec 17 2018 00:00:00 GMT+0530 (India Standard Time)',
      //       is_call_completed: 0,
      //       note: "Note - 2",
      //       phone_number: "(222) 222-2222",
      //       recurring_end_date: "",
      //       recurring_end_date_type_id: 1,
      //       recurring_type_id: 2,
      //       schedule_date: "2019-01-02 22:03:00",
      //       weekly: "",
      //       _id: 2
      //     },
      //     {
      //       color_type_id: 0,
      //       contact_name: "Anil",
      //       generatedScheduleDate: 'Tue Jan 01 2019 22:01:00 GMT+0530 (India Standard Time)',
      //       note: "Note - 1",
      //       phone_number: "+91 11 1111 1111",
      //       recurring_end_date: "",
      //       recurring_end_date_type_id: 0,
      //       recurring_type_id: 1,
      //       schedule_date: "2019-01-01 22:01:00",
      //       weekly: "",
      //       _id: 1
      //     }
      //   ],
      //   oldArr: [],
      //   recurringArr: [],
      //   completedArr: []
      // },
    };

    // this.handleOnPhoneNumberChange = this.handleOnPhoneNumberChange.bind(this);
    // this.openDate = this.openDate.bind(this);
    // this.openTime = this.openTime.bind(this);
    // this.openRecurring = this.openRecurring.bind(this);
    // this.onColorSelect = this.onColorSelect.bind(this);
    // this.getPhoneNumber = this.getPhoneNumber.bind(this);

    // this.onCallSavePressed = this.onCallSavePressed.bind(this);

    // this.onAddPress = this.onAddPress.bind(this);
    // this.onCancelPress = this.onCancelPress.bind(this);
  }

  static navigationOptions = (
    { navigation, screenProps } //(
  ) => {
    const { navigate } = navigation;
    return {
      headerLeft: (
        <View />
        // <MenuIcon
        //   navigation={navigation}
        //   onPress={() => navigate("DrawerOpen")}
        // />
      ),
      headerTitle: (
        <MenuTitle navigation={navigation} titleName={"Call Planner"} />
      ),
      headerRight: (
        <View style={{ flex: 1 }}>
          <Touchable
            onPress={() => navigate("AddCallRoute")}
            style={[
              {
                padding: 10,
                borderRadius: 30
              }
            ]}
            background={Touchable.Ripple(
              stylesColors.touchable_ripple_color,
              true
            )}
          >
            <Icon name="add" color="white" size={25} />
          </Touchable>
        </View>
      )
    };
  };

  componentDidMount() {
    console.log("CallListScreen props: ", this.props);
    // CallService.getCallList()
    //   .then(res => {
    //     //console.log("----------res", res);
    //     CallService.callListTypeFilter(res)
    //       .then(filteredRes => {
    //         console.log("----------filteredRes", filteredRes);
    //         this.setState({
    //           sendProps: filteredRes,
    //           isLoaded: true
    //         });
    //       })
    //       .catch(err => {
    //         console.log("CallService.callListTypeFilter() Error:: ", err);
    //         this.setState({ isLoaded: true });
    //       });
    //   })
    //   .catch(err => {
    //     console.log("CallService.getCallList() Error:: ", err);
    //     this.setState({ isLoaded: true });
    //   });
  }

  render() {
    if (!this.state.isLoaded) {
      //return null;
      return <LoadingComponent />;
    }

    return (
      <View style={styles.container}>
        <CallsTab
          //screenProps={this.state.sendProps}
          screenProps={this.props}
        />
      </View>
    );
  }
}
