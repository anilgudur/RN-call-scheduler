import React, {Component } from 'react';
import { View, Text, TextInput, DatePickerAndroid, TimePickerAndroid, TouchableHighlight, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { AddCallHeader } from "../../Header/Headers";
import { Icon } from 'react-native-elements';
import { global as gStyle, addCallScreen as styles, colors as stylesColors, values as styleValues } from '../../Styles/Styles';
import moment from 'moment';
import WeeklyDaysRow from './WeeklyDaysRow';
import { appConsts } from '../../constants';
const {
  rdOptionRecurring, rdOptionRecurringEndDate, weeklyDaysOptions
} = appConsts;

export default class RecurringScreen extends Component {

  static propTypes = {
      onRecurringTypeSelect: PropTypes.func.isRequired,
      rdRecurringEndDateSelect: PropTypes.func.isRequired,
      recurringDateSelect: PropTypes.func.isRequired,
  };

  static navigationOptions = ({ navigation, screenProps }) => //(
  {
    const { navigate } = navigation;
    return {
      headerLeft: null,
      headerTitle: <AddCallHeader
                      navigation={navigation}
                      titleName={"Recurring Type"}
                  />,
      headerRight: null
    }
  };

  constructor(props) {
    super(props);
    console.log('this.props RecurringScreen =>> ', this.props);

    this.state = {
      isFocusedDate: false
    }

    this.setRecurringType = this.setRecurringType.bind(this);
    this.rdRecurringEndDateSelect = this.rdRecurringEndDateSelect.bind(this);
    this.openDate = this.openDate.bind(this);
    this.onWeeklyDaySelect = this.onWeeklyDaySelect.bind(this);
  }

  setRecurringType(type) {
    console.log('type: ', type);
    this.props.onRecurringTypeSelect(type);
  }

  rdRecurringEndDateSelect(date) {
    console.log('date: ', date);
    this.props.rdRecurringEndDateSelect(date);
  }

  async openDate() {
    console.log('this.props.addCall.recurring.endDate::: ', this.props.addCall.recurring.endDate);
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        minDate: new Date(),
        mode: 'spinner',
        date: moment(this.props.addCall.recurring.endDate).toDate()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        console.log('*****', year, month, day);
        this.props.recurringDateSelect(new Date(Date.UTC(year, month, day, 18, 0, 0)));
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  onWeeklyDaySelect(day) {
    let weeklyDays = this.props.addCall.recurring.weeklyDays || [];
    let key = weeklyDays.indexOf(day);
    if (key === -1) {
      weeklyDays.push(day);
    } else {
      weeklyDays.splice(key, 1);
    }
    console.log('weeklyDays:: ', weeklyDays);
    this.props.weeklyDaysSelectAction(weeklyDays);
    // this.setState({
    //   //weeklyDays: weeklyDays,
    //   extraData_weeklyDays: !this.state.extraData_weeklyDays
    // });
  }

  _keyExtractor_weeklyDaysRow = (item, index) => index.toString();
  _renderItem_weeklyDaysRow = ({ item, index }) => (
    <WeeklyDaysRow
      id={index}
      index={index}
      item={item}
      weeklyDays={this.props.addCall.recurring.weeklyDays}
      onWeeklyDaySelect={this.onWeeklyDaySelect}
    />
  );

  render() {
    //const item = this.props.item;

    return (
      <View style={gStyle.container}>

        <View style={gStyle.header}>
          <Text style={gStyle.headerText}>Recurring Type</Text>
        </View>

        <View style={gStyle.radioRow}>
          <TouchableHighlight
            onPress={() => {this.setRecurringType(rdOptionRecurring.doNotRepeat)}}
            underlayColor={stylesColors.button_underlay_color}
          >
            <View style={[gStyle.radioTouchableRow, {backgroundColor:'transparent'}]}>
              <Icon name={this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? 'radio-button-checked' : 'radio-button-unchecked'} color={stylesColors.radio_icon_color} size={styleValues.radio_size} />
              <Text style={gStyle.radioLabel}>Do no repeat</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={gStyle.radioRow}>
          <TouchableHighlight
            onPress={() => {this.setRecurringType(rdOptionRecurring.daily)}}
            underlayColor={stylesColors.button_underlay_color}
          >
            <View style={[gStyle.radioTouchableRow, {backgroundColor:'transparent'}]}>
              <Icon name={this.props.addCall.recurring.on == rdOptionRecurring.daily ? 'radio-button-checked' : 'radio-button-unchecked'} color={stylesColors.radio_icon_color} size={styleValues.radio_size} />
              <Text style={gStyle.radioLabel}>Daily</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={gStyle.radioRow}>
          <TouchableHighlight
            onPress={() => {this.setRecurringType(rdOptionRecurring.weekly)}}
            underlayColor={stylesColors.button_underlay_color}
          >
            <View style={[gStyle.radioTouchableRow, {backgroundColor:'transparent'}]}>
              <Icon name={this.props.addCall.recurring.on == rdOptionRecurring.weekly ? 'radio-button-checked' : 'radio-button-unchecked'} color={stylesColors.radio_icon_color} size={styleValues.radio_size} />
              <Text style={gStyle.radioLabel}>Weekly</Text>
            </View>
          </TouchableHighlight>
        </View>

        {
          this.props.addCall.recurring.on === rdOptionRecurring.weekly && 
          <View style={[styles.row]}>
            <FlatList
              data={weeklyDaysOptions}
              extraData={this.props.addCall.recurring.extraData_weeklyDays}
              keyExtractor={this._keyExtractor_weeklyDaysRow}
              renderItem={this._renderItem_weeklyDaysRow}
              horizontal={true}
            />
          </View>
        }

        <View style={gStyle.radioRow}>
          <TouchableHighlight
            onPress={() => {this.setRecurringType(rdOptionRecurring.monthly)}}
            underlayColor={stylesColors.button_underlay_color}
          >
            <View style={[gStyle.radioTouchableRow, {backgroundColor:'transparent'}]}>
              <Icon name={this.props.addCall.recurring.on == rdOptionRecurring.monthly ? 'radio-button-checked' : 'radio-button-unchecked'} color={stylesColors.radio_icon_color} size={styleValues.radio_size} />
              <Text style={gStyle.radioLabel}>Monthly</Text>
            </View>
          </TouchableHighlight>
        </View>


        <View style={gStyle.header}>
          <Text style={gStyle.headerText}>Recurring End Date</Text>
        </View>

        <View style={gStyle.radioRow}>
          <TouchableHighlight
            onPress={() => {this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? null : this.rdRecurringEndDateSelect(rdOptionRecurringEndDate.forever)}}
            underlayColor={this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? 'transparent' : stylesColors.button_underlay_color}
          >
            <View style={[gStyle.radioTouchableRow, {backgroundColor:'transparent'}]}>
              <Icon name={this.props.addCall.recurring.endDateType == rdOptionRecurringEndDate.forever ? 'radio-button-checked' : 'radio-button-unchecked'} color={this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? stylesColors.icon_color_disabled : stylesColors.radio_icon_color} size={styleValues.radio_size} onPress={() => {}} />
              <Text style={[gStyle.radioLabel, this.props.addCall.recurring.on === rdOptionRecurring.doNotRepeat ? {color: stylesColors.text_color_disabled} : {color:stylesColors.text_color_enabled} ]}>Forever</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={gStyle.radioRow}>
          <TouchableHighlight
            onPress={() => {this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? null : this.rdRecurringEndDateSelect(rdOptionRecurringEndDate.endDate)}}
            underlayColor={this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? 'transparent' : stylesColors.button_underlay_color}
          >
            <View style={[gStyle.radioTouchableRow, {backgroundColor:'transparent'}]}>
              <Icon name={this.props.addCall.recurring.endDateType == rdOptionRecurringEndDate.endDate ? 'radio-button-checked' : 'radio-button-unchecked'} color={this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? stylesColors.icon_color_disabled : stylesColors.radio_icon_color} size={styleValues.radio_size} onPress={() => {}} />
              <Text style={[gStyle.radioLabel, this.props.addCall.recurring.on === rdOptionRecurring.doNotRepeat ? {color: stylesColors.text_color_disabled} : {color:stylesColors.text_color_enabled} ]}>End date:</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={{ 
          //borderWidth:1, borderColor:'#000000'
        }}>
          <View style={
            [
              //styles.inputView,
              {borderBottomWidth:1},
              styles.dateView,
              this.state.isFocusedDate ? {borderBottomColor:stylesColors.text_input_border_bottom_color_active}: {borderBottomColor:stylesColors.text_input_border_bottom_color},
              {marginLeft:33},
              {width: 130}
            ]}>
            <TextInput
              style={[styles.input, styles.dateTextInput]} 
              placeholder="Date"
              placeholderTextColor={stylesColors.place_holder_text_color}
              selectionColor={stylesColors.selection_color}
              //editable={false}
              onFocus={() => {
                this.setState({isFocusedDate: true});
                this.openDate();
              }}
              onEndEditing={() => { this.setState({isFocusedDate: false}) }}
              value={moment(this.props.addCall.recurring.endDate).format("MMM DD, YYYY")}
              editable={this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? false : true}
            />
            <Icon name='arrow-drop-down' color={stylesColors.icon_color} size={25} onPress={() => {this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? null : this.openDate();}}
            underlayColor={this.props.addCall.recurring.on == rdOptionRecurring.doNotRepeat ? 'transparent' : stylesColors.button_underlay_color}
            />
          </View>
        </View>


      </View>
    )
  }
}