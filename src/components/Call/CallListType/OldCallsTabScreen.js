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
    // screenProps: PropTypes.shape({
    //   oldArr: PropTypes.array.isRequired,
    //   oldDatesArr: PropTypes.array.isRequired
    // }).isRequired
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
      sendProps: {},
      extraData_callColors: false
    };
    console.log("this.props:: ", this.props);
  }

  componentDidMount() {
    // if (
    //   Array.isArray(this.props.screenProps.oldArr) &&
    //   Array.isArray(this.props.screenProps.oldDatesArr)
    // ) {
    this.setState({
      isLoaded: true
    });
    //}
  }

  _keyExtractor_callColorsRow = (item, index) => index.toString();
  _renderItem_callColorsRow = ({ item, index }) => (
    <CallDateRow
      id={index}
      index={index}
      item={item}
      //oldArr={this.props.screenProps.oldArr}
      //dataArr={this.props.screenProps.oldArr}
      dataArr={this.state.sendProps.oldArr}
      //color={this.state.color}
      //onColorSelect={this.onColorSelect}
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
          //data={this.props.screenProps.oldDatesArr}
          data={this.state.sendProps.oldDatesArr}
          extraData={this.state.extraData_callColors}
          keyExtractor={this._keyExtractor_callColorsRow}
          renderItem={this._renderItem_callColorsRow}
        />
      </View>
    );
  }
}
