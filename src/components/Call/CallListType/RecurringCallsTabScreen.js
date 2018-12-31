import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import { tabs as tabsStyle } from "../../../Styles/Styles";
import moment from "moment";
import CallDateRow from "../CallDateRow";
import Ionicons from "react-native-vector-icons/Ionicons";
import CallService from "../../../Services/CallService";

export default class RecurringCallsTabScreen extends Component {
  static propTypes = {};

  static navigationOptions = {
    tabBarLabel: "Recurring"
    // tabBarIcon: ({ tintColor, focused }) => (
    //     <Ionicons
    //         name={focused ? 'ios-home' : 'ios-home-outline'}
    //         size={23}
    //         style={tabsStyle.icons}
    //     />
    // ),
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      recurringDatesArr: [],
      recurringArr: [],
      extraData_callColors: false
    };
  }

  componentDidMount() {
    this.getCallList();
  }

  componentWillReceiveProps() {
    // console.log(">>>", this.props.screenProps.callListRefresh);
    // console.log("<<<", this.state.callListRefresh);
    if (this.props.screenProps.callListRefresh === true) {
      this.getCallList();
    }
  }

  getCallList() {
    //console.log(".....getCallList");
    CallService.getCallList()
      .then(res => {
        CallService.callListTypeFilterAW(res, "RECURRING")
          .then(filteredRes => {
            this.setState({
              recurringArr: filteredRes.recurringArr,
              recurringDatesArr: filteredRes.recurringDatesArr,
              isLoaded: true,
              extraData_callColors: !this.state.extraData_callColors
            });
          })
          .catch(err => {
            //console.log("CallService.callListTypeFilter() Error:: ", err);
            this.setState({ isLoaded: true });
          });
      })
      .catch(err => {
        //console.log("CallService.getCallList() Error:: ", err);
        this.setState({ isLoaded: true });
      });
  }

  _keyExtractor_callColorsRow = (item, index) => index.toString();
  _renderItem_callColorsRow = ({ item, index }) => (
    <CallDateRow
      id={index}
      index={index}
      item={item}
      dataArr={this.state.recurringArr}
      screenProps={this.props.screenProps}
      onMoveToCompletedPressed={this.onMoveToCompletedPressed}
      onDeleteCallPressed={this.onDeleteCallPressed}
    />
  );

  onMoveToCompletedPressed = item => {
    CallService.moveToCompleted(item)
      .then(res => {
        //console.log("onCallSaveValid res: ", res);
        if (res.success === true) {
          //this.getCallList();
          this.props.screenProps.callListRefreshAction();
          this.props.screenProps.callListRefreshFalseAction();
        }
      })
      .catch(err => {
        //console.log("onCallSaveValid Error: ", err);
      });
  };

  onDeleteCallPressed = item => {
    CallService.deleteCall(item)
      .then(res => {
        //console.log("onCallSaveValid res: ", res);
        if (res.success === true) {
          //this.getCallList();
          this.props.screenProps.callListRefreshAction();
          this.props.screenProps.callListRefreshFalseAction();
        }
      })
      .catch(err => {
        //console.log("onCallSaveValid Error: ", err);
      });
  };

  render() {
    if (!this.state.isLoaded) {
      return null;
    }

    return (
      <View
        style={{
          paddingTop: 15
        }}
      >
        {this.state.recurringArr.length === 0 && (
          <Text style={{ color: "red", textAlign: "center" }}>
            No calls found.
          </Text>
        )}
        <FlatList
          data={this.state.recurringDatesArr}
          extraData={this.state.extraData_callColors}
          keyExtractor={this._keyExtractor_callColorsRow}
          renderItem={this._renderItem_callColorsRow}
        />
      </View>
    );
  }
}
