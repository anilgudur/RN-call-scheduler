import React, {Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'react-native-elements';
import { call_listing_screen as listingStyles, addCallScreen as styles, colors as stylesColors } from '../../Styles/Styles';
import { appConsts } from '../../constants';
import moment from 'moment';
import CallRow from './CallRow';
const {
  callColorOptions, callColors
} = appConsts;

export default class CallDateRow extends Component {

  static propTypes = {
  }

  constructor(props) {
    super(props);

    console.log('@@@@@this.props', this.props);
    this.state = {
      diffDays: 0,
      generatedDateFormat: '',
      extraData_callColors: false
    }
  }

  componentDidMount() {
    this.setState({
      diffDays: moment([this.props.item]).diff(moment([]), 'days'),
      generatedDateFormat: moment(this.props.item).format('DD-MM-YYYY')
    })
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
    const item = this.props.item;

    return (
      <View
        style={{
          paddingTop:15,
        }}
      >
        <Text style={{paddingLeft:12, paddingBottom:5, fontSize:12, fontWeight:'bold'}}>
          {this.state.diffDays === 0 ? 'Today' : (this.state.diffDays === 1 ? 'Tomorrow' : this.state.generatedDateFormat)}
        </Text>
        <FlatList
          data={this.props.dataArr}
          extraData={this.state.extraData_callColors}
          keyExtractor={this._keyExtractor_callColorsRow}
          renderItem={this._renderItem_callColorsRow}
        />
      </View>
    )
  }
}