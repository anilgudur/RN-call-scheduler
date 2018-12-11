import React, {Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'react-native-elements';
import { addCallScreen as styles, colors as stylesColors } from '../../Styles/Styles';
import { appConsts } from '../../constants';
const {
  weeklyDaysOptions,
  callColors
} = appConsts;

export default class WeeklyDaysRow extends Component {

  static propTypes = {
    //item: PropTypes.arrayOf(PropTypes.object).isRequired,
    //item: PropTypes.array.isRequired,

    onWeeklyDaySelect: PropTypes.func.isRequired,
    //onWeeklyDaySelect_Back: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.onWeeklyDaySelect = this.onWeeklyDaySelect.bind(this);
  }

  onWeeklyDaySelect(day) {
    this.props.onWeeklyDaySelect(day);
  }
  //<TouchableHighlight style={styles.doneButton} onPress={this.onDonePressed}></TouchableHighlight>

  render() {
    const item = this.props.item;
    const keyDay = Object.keys(item)[0];
    const valDay = Object.values(item)[0];
    let varDay = callColors[keyDay];
    let day =  keyDay.charAt(0).toUpperCase();
    //console.log('this.props.addCall.color ==> ', this.props.addCall.color);
    //console.log('keyDay ::> ', keyDay);

    return (
      <Avatar
        small
        rounded
        title={day}
        onPress={() => {this.onWeeklyDaySelect(valDay);}}
        activeOpacity={1.0}
        titleStyle={{fontSize:12}}
        containerStyle={{marginLeft:6}}
        overlayContainerStyle={[this.props.weeklyDays.includes(valDay) ? {backgroundColor: '#4285F4'} : {backgroundColor: '#BCBEC1'}, {width:30, height:30}]}
      />
      // <Icon name={this.props.color == valDay ? 'check-circle' : 'fiber-manual-record'} color={varDay} size={45}
      // onPress={() => {this.onWeeklyDaySelect(valDay);}}
      // />
    )
  }
}