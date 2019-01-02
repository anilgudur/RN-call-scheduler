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

    this.state = {
      isLoaded: false,
      newDataArr: [],
      diffDays: 0,
      generatedDateFormat: "",
      extraData_callColors: false
    };
  }

  async componentDidMount() {
    let todaysDate = new Date();
    todaysDate = new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth(),
      todaysDate.getDate(),
      0,
      0,
      0
    );
    let newArr = await this.filterData(this.props.item, this.props.dataArr);
    this.setState({
      newDataArr: newArr,
      diffDays: moment(this.props.item).diff(todaysDate, "days"),
      generatedDateFormat: moment(this.props.item).format("DD-MM-YYYY"),
      isLoaded: true
    });
  }

  filterData(date, arr) {
    return new Promise(async (resolve, reject) => {
      let newArr = await arr.filter(
        row => moment(row.generatedScheduleDate).format("YYYY-MM-DD") === date
      );
      resolve(newArr);
    });
  }

  _keyExtractor_callColorsRow = (item, index) => index.toString();
  _renderItem_callColorsRow = ({ item, index }) => (
    <CallRow
      id={index}
      index={index}
      item={item}
      //color={this.state.color}
      //onColorSelect={this.onColorSelect}
      screenProps={this.props.screenProps}
      onMoveToCompletedPressed={this.props.onMoveToCompletedPressed}
      onDeleteCallPressed={this.props.onDeleteCallPressed}
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
            fontSize: 13,
            fontFamily: "Roboto-Medium",
            color: "#636363"
          }}
        >
          {this.state.diffDays === 0
            ? "Today"
            : this.state.diffDays === 1
            ? "Tomorrow"
            : this.state.generatedDateFormat}
        </Text>
        <FlatList
          data={this.state.newDataArr}
          extraData={this.state.extraData_callColors}
          keyExtractor={this._keyExtractor_callColorsRow}
          renderItem={this._renderItem_callColorsRow}
        />
      </View>
    );
  }
}
