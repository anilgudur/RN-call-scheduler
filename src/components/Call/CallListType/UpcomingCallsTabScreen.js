import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import { tabs as tabsStyle } from "../../../Styles/Styles";
import moment from "moment";
import CallDateRow from "../CallDateRow";
import Ionicons from "react-native-vector-icons/Ionicons";
import CallService from "../../../Services/CallService";
import CallService2 from "../../../Services/CallService2";

export default class UpcomingCallsTabScreen extends Component {
  static propTypes = {
    // screenProps: PropTypes.shape({
    //   upcomingArr: PropTypes.array.isRequired,
    //   upcomingDatesArr: PropTypes.array.isRequired
    // }).isRequired
  };

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
      //sendProps: {},
      upcomingDatesArr: [],
      upcomingArr: [],
      extraData_callColors: false,

      todaysDate: ""
    };
    console.log("this.props:: ", this.props);
  }

  componentDidMount() {
    // CallService.getCallList()
    //   .then(res => {
    //     //console.log("----------res", res);
    //     CallService.callListTypeFilter(res, "UPCOMING")
    //       .then(filteredRes => {
    //         console.log("----------filteredRes", filteredRes);
    //         this.setState({
    //           //sendProps: filteredRes,
    //           upcomingDatesArr: filteredRes.upcomingDatesArr,
    //           upcomingArr: filteredRes.upcomingArr,
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

    CallService.getCallList()
      .then(res => {
        //console.log("----------res", res);
        CallService2.callListTypeFilterAW(res, "UPCOMING")
          .then(filteredRes => {
            console.log("----------filteredRes", filteredRes);
            this.setState({
              upcomingArr: filteredRes.upcomingArr,
              isLoaded: true
              //todaysDate: filteredRes.todaysDate
            });
          })
          .catch(err => {
            console.log("CallService.callListTypeFilter() Error:: ", err);
            this.setState({ isLoaded: true });
          });
      })
      .catch(err => {
        console.log("CallService.getCallList() Error:: ", err);
        this.setState({ isLoaded: true });
      });
  }

  _keyExtractor_callColorsRow = (item, index) => index.toString();
  _renderItem_callColorsRow = ({ item, index }) => (
    <CallDateRow
      id={index}
      index={index}
      item={item}
      //upcomingArr={this.props.screenProps.upcomingArr}
      //dataArr={this.props.screenProps.upcomingArr}
      dataArr={this.state.upcomingArr}
      //color={this.state.color}
      //onColorSelect={this.onColorSelect}
    />
  );

  render() {
    if (!this.state.isLoaded) {
      return null;
    }

    let upcomingArrStr = "";
    this.state.upcomingArr.forEach(row => {
      console.log("rowrow", row);
      row.forEach(name => {
        console.log("namename", name);
        upcomingArrStr += JSON.stringify(name);
      });
    });

    return (
      <View
        style={{
          paddingTop: 15
        }}
      >
        <Text>Hi</Text>
        <Text>{this.state.upcomingArr.length}</Text>
        <Text>upcomingArr:{upcomingArrStr}</Text>
      </View>
    );
  }
}

// <FlatList
// //data={this.props.screenProps.upcomingDatesArr}
// //data={this.state.upcomingDatesArr}
// data={this.state.upcomingArr}
// extraData={this.state.extraData_callColors}
// keyExtractor={this._keyExtractor_callColorsRow}
// renderItem={this._renderItem_callColorsRow}
// />
