import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import { tabs as tabsStyle } from "../../../Styles/Styles";
import moment from "moment";
import CallDateRow from "../CallDateRow";
import Ionicons from "react-native-vector-icons/Ionicons";
import CallService from "../../../Services/CallService";
import { LoadingComponent } from "../../CommonComponents/CommonComponents";

export default class UpcomingCallsTabScreen extends Component {
  static propTypes = {};

  static navigationOptions = {
    tabBarLabel: "Upcoming"
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
      upcomingDatesArr: [],
      upcomingArr: [],
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
        CallService.callListTypeFilterAW(res, "UPCOMING")
          .then(filteredRes => {
            console.log("filteredRes", filteredRes);
            this.setState({
              upcomingArr: filteredRes.upcomingArr,
              upcomingDatesArr: filteredRes.upcomingDatesArr,
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
      dataArr={this.state.upcomingArr}
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
      //return null;
      return <LoadingComponent />;
    }

    return (
      <View
        style={{
          paddingTop: 15
        }}
      >
        {this.state.upcomingArr.length === 0 && (
          <Text style={{ color: "red", textAlign: "center" }}>
            No calls found.
          </Text>
        )}
        <FlatList
          data={this.state.upcomingDatesArr}
          extraData={this.state.extraData_callColors}
          keyExtractor={this._keyExtractor_callColorsRow}
          renderItem={this._renderItem_callColorsRow}
        />
      </View>
    );
  }
}
