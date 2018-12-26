import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { tabs as tabsStyle } from "../../../Styles/Styles";
import moment from "moment";
import CallDateRow from "../CallDateRow";
import Ionicons from "react-native-vector-icons/Ionicons";
import CallService from "../../../Services/CallService";

export default class OldCallsTabScreen extends Component {
  static propTypes = {
  };

  static navigationOptions = {
    tabBarLabel: "Old"
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
      oldDatesArr: [],
      oldArr: [],
      extraData_callColors: false
    };
  }

  componentDidMount() {
    CallService.getCallList().then(res => {
      CallService.callListTypeFilterAW(res, "OLD").then(filteredRes => {
        this.setState({
          oldArr: filteredRes.oldArr,
          oldDatesArr: filteredRes.oldDatesArr,
          isLoaded: true
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
      dataArr={this.state.oldArr}
    />
  );

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
        <FlatList
          data={this.state.oldDatesArr}
          extraData={this.state.extraData_callColors}
          keyExtractor={this._keyExtractor_callColorsRow}
          renderItem={this._renderItem_callColorsRow}
        />
      </View>
    );
  }

}
