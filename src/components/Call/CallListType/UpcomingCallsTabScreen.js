import React, { Component } from 'react';
import { View, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { tabs as tabsStyle } from '../../../Styles/Styles';
import moment from 'moment';
import CallDateRow from '../CallDateRow';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UpcomingCallsTabScreen extends Component {
  static navigationOptions = {
      tabBarLabel: 'Upcoming',
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
      extraData_callColors: false
    }
    console.log('this.props:: ', this.props);
  }

  _keyExtractor_callColorsRow = (item, index) => index.toString();
  _renderItem_callColorsRow = ({ item, index }) => (
    <CallDateRow
      id={index}
      index={index}
      item={item}
      //upcomingArr={this.props.screenProps.upcomingArr}
      dataArr={this.props.screenProps.upcomingArr.filter(row => moment(row.generatedScheduleDate).format("YYYY-MM-DD") === item)}
      //color={this.state.color}
      //onColorSelect={this.onColorSelect}
    />
  );

  render() {
      // if (!this.props.screenProps.upcomingArr) {
      //   return null;
      // }

      return (
          <View
            style={{
              paddingTop:15,
            }}
          >
            <FlatList
              data={this.props.screenProps.upcomingDatesArr}
              extraData={this.state.extraData_callColors}
              keyExtractor={this._keyExtractor_callColorsRow}
              renderItem={this._renderItem_callColorsRow}
            />
          </View>
      );
  }
}