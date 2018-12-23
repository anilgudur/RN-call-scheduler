import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import PropTypes from "prop-types";
import { Avatar, Icon } from "react-native-elements";
import {
  call_listing_screen as listingStyles,
  addCallScreen as styles,
  colors as stylesColors
} from "../../Styles/Styles";
import { appConsts } from "../../constants";
import moment from "moment";
import CallRow from "./CallRow";
const { callColorOptions, callColors } = appConsts;

export default class CallDateRow extends Component {
  static propTypes = {
    item: PropTypes.string.isRequired,
    dataArr: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    //console.log("@@@@@this.props", this.props);
    this.state = {
      isLoaded: false,
      newDataArr: [],
      diffDays: 0,
      generatedDateFormat: "",
      extraData_callColors: false
    };
  }

  componentDidMount() {
    // if (
    //   this.props.item === undefined ||
    //   this.props.item === "" ||
    //   this.props.item === "Invalid date"
    // ) {
    // } else {
    let newArr = this.props.dataArr.filter(
      row =>
        moment(new Date(row.generatedScheduleDate)).format("YYYY-MM-DD") ===
        this.props.item
    );
    this.setState({
      newDataArr: newArr,
      // diffDays: moment([this.props.item]).diff(moment([]), "days"),
      // generatedDateFormat: moment(this.props.item).format("DD-MM-YYYY"),
      diffDays: moment(new Date(this.props.item)).diff(moment([]), "days"),
      generatedDateFormat: moment(new Date(this.props.item)).format(
        "DD-MM-YYYY"
      ),
      isLoaded: true
    });
    //}
  }

  _keyExtractor_callColorsRow = (item, index) => index.toString();
  _renderItem_callColorsRow = ({ item, index }) => (
    <CallRow
      id={index}
      index={index}
      item={item}
      //color={this.state.color}
      //onColorSelect={this.onColorSelect}
    />
  );

  render() {
    //const item = this.props.item;

    // if (
    //   this.props.item === undefined ||
    //   this.props.item === "" ||
    //   this.props.item === "Invalid date"
    // ) {
    //   return null;
    // }
    if (!this.state.isLoaded) {
      return null;
    }

    return (
      <View
        style={{
          paddingTop: 15
        }}
      >
        <Text
          style={{
            paddingLeft: 12,
            paddingBottom: 5,
            fontSize: 12,
            fontWeight: "bold"
          }}
        >
          Date val:
        </Text>
      </View>
    );
  }
}

// {this.props.item} ||
// {this.state.diffDays === 0
//   ? "Today"
//   : this.state.diffDays === 1
//   ? "Tomorrow"
//   : this.state.generatedDateFormat}

// <FlatList
//           data={this.state.newDataArr}
//           extraData={this.state.extraData_callColors}
//           keyExtractor={this._keyExtractor_callColorsRow}
//           renderItem={this._renderItem_callColorsRow}
//         />
