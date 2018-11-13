import React, {Component } from 'react';
import { View, Text, TextInput, DatePickerAndroid, TimePickerAndroid, TouchableHighlight, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { AddCallHeader } from "../../Header/Headers";
import { Icon } from 'react-native-elements';
import { addCallScreen as styles, colors as stylesColors } from '../../Styles/Styles';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';
import CallColorsRow from './CallColorsRow';
import { appConsts } from '../../constants';
const {
  callColorOptions, rdOptionRecurring, rdOptionRecurringEndDate
} = appConsts;

export default class AddCallScreen extends Component {

  static propTypes = {
    //screenProps: PropTypes.shape({
      onAddPress: PropTypes.func.isRequired,
    //}).isRequired
  };

  static navigationOptions = ({ navigation, screenProps }) => //(
  {
    const { navigate } = navigation;
    return {
      headerLeft: null,
      headerTitle: <AddCallHeader
                      navigation={navigation}
                      titleName={"Privacy Policy"}
                  />,
      headerRight: null
    }
  };

  constructor(props) {
    super(props);
    console.log('this.props AddCallScreen =>> ', this.props);

    this.state = {
      date: new Date(),
      recurring: {
        on: 'DO_NOT_REPEAT',
        endDate: null,
      },
      extraData_callColors: false,

      isFocusedContactName: false,
      isFocusedPhoneNumber: false,
      isFocusedDate: false,
      isFocusedTime: false,
      isFocusedNote: false,
    }

    this.openDate = this.openDate.bind(this);
    this.openTime = this.openTime.bind(this);
    this.openRecurring = this.openRecurring.bind(this);
    this.onColorSelect_Back = this.onColorSelect_Back.bind(this);

    this.onAddPress = this.onAddPress.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
  }


  async openDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        minDate: new Date(),
        mode: 'spinner',
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        console.log(year, month, day);
        this.setState({date:new Date(year, month, day, this.state.date.getHours(), this.state.date.getMinutes())});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  async openTime() {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: this.state.date.getHours(),
        minute: this.state.date.getMinutes(),
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        console.log(hour, minute);
        this.setState({date:new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate(), hour, minute)});
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  openRecurring() {
    console.log('recurringRoute: ', this.props.navigation);
    this.props.navigation.navigate('RecurringRoute');
  }

  onColorSelect_Back(color) {
    this.props.onColorSelect(color);
    setTimeout(() => {
      this.setState({extraData_callColors: !this.state.extraData_callColors});
    }, 1000)
  }

  _keyExtractor_callColorsRow = (item, index) => index.toString();
  _renderItem_callColorsRow = ({ item, index }) => (
    <CallColorsRow
      id={index}
      index={index}
      item={item}
      addCall={this.props.addCall}
      onColorSelect={this.props.onColorSelect}
      //onColorSelect_Back={this.onColorSelect_Back}
    />
  );


  onChange(text) {
    this.task = text;
  }

  onAddPress() {
    this.props.onAddPress(this.props.navigation, this.task);
  }

  onCancelPress(navigation) {
    this.props.navigation.goBack();
  }

  render() {
    //const item = this.props.item;

    let recurringString = 'Recurring: ';
    switch(this.props.addCall.recurring.on) {
      case rdOptionRecurring.doNotRepeat:
        recurringString += I18n.t('rdOptionRecurring.doNotRepeat');
        break;
      case rdOptionRecurring.daily:
        recurringString += I18n.t('rdOptionRecurring.daily') + ' ';
        break;
      case rdOptionRecurring.weekly:
        recurringString += I18n.t('rdOptionRecurring.weekly') + ' ';
        break;
      case rdOptionRecurring.monthly:
        recurringString += I18n.t('rdOptionRecurring.monthly') + ' ';
        break;
    }
    switch(this.props.addCall.recurring.endDateType) {
      case rdOptionRecurringEndDate.forever:
        recurringString += '(' + I18n.t('rdOptionRecurringEndDate.forever').toLowerCase() + ')';
        break;
      case rdOptionRecurringEndDate.endDate:
        recurringString += '(' + I18n.t('words.until') + ' ';
        recurringString += moment(this.props.addCall.recurring.endDate).format("MMM DD, YYYY");
        recurringString += ')';
        break;
    }

    return (
      <View style={styles.container}>

        <View style={[styles.row, styles.firstRow]}>
          <View style={styles.colLeft}>
            <Icon name='person' color={stylesColors.icon_color} size={25} />
          </View>
          <View style={[styles.inputView, this.state.isFocusedContactName ? {borderBottomColor:stylesColors.text_input_border_bottom_color_active}: {borderBottomColor:stylesColors.text_input_border_bottom_color}]}>
            <TextInput
              style={styles.input} 
              placeholder="Contact name"
              placeholderTextColor={stylesColors.place_holder_text_color}
              selectionColor={stylesColors.selection_color}
              editable={false}
            />
          </View>
          <View style={styles.colRight}>
            <Icon name='person-add' color={stylesColors.icon_color} size={25} onPress={() => {}} />
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={styles.colLeft}>
            <Icon name='call' color={stylesColors.icon_color} size={25} />
          </View>
          <View style={[styles.inputView, this.state.isFocusedPhoneNumber ? {borderBottomColor:stylesColors.text_input_border_bottom_color_active}: {borderBottomColor:stylesColors.text_input_border_bottom_color}]}>
            <TextInput
              style={styles.input} 
              //onChangeText={this.onChange.bind(this)} 
              placeholder="Phone number"
              placeholderTextColor={stylesColors.place_holder_text_color}
              selectionColor={stylesColors.selection_color}
              keyboardType="numeric"
              returnKeyType="next"
              onFocus={() => { this.setState({isFocusedPhoneNumber: true}) }}
              onEndEditing={() => { this.setState({isFocusedPhoneNumber: false}) }}
            />
          </View>
          <View style={styles.colRight}>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={styles.colLeft}>
            <Icon name='event' color={stylesColors.icon_color} size={25} />
          </View>
          <View style={styles.dateTimeContainer}>
            <View style={[styles.inputView, styles.dateView, this.state.isFocusedDate ? {borderBottomColor:stylesColors.text_input_border_bottom_color_active}: {borderBottomColor:stylesColors.text_input_border_bottom_color} ]}>
              <TextInput
                style={[styles.input, styles.dateTextInput]} 
                //onChangeText={this.onChange.bind(this)} 
                placeholder="Date"
                placeholderTextColor={stylesColors.place_holder_text_color}
                selectionColor={stylesColors.selection_color}
                //editable={false}
                onFocus={() => {
                  this.setState({isFocusedDate: true});
                  this.openDate();
                }}
                onEndEditing={() => { this.setState({isFocusedDate: false}) }}
                value={moment(this.state.date).format("MMM DD, YYYY")}
              />
              <Icon name='arrow-drop-down' color={stylesColors.icon_color} size={25} onPress={() => {this.openDate();}} />
            </View>

            <View style={[styles.inputView, styles.timeView, this.state.isFocusedTime ? {borderBottomColor:stylesColors.text_input_border_bottom_color_active}: {borderBottomColor:stylesColors.text_input_border_bottom_color}]}>
              <TextInput
                style={[styles.input, styles.dateTextInput]} 
                //onChangeText={this.onChange.bind(this)} 
                placeholder="Date"
                placeholderTextColor={stylesColors.place_holder_text_color}
                selectionColor={stylesColors.selection_color}
                //editable={false}
                onFocus={() => {
                  this.setState({isFocusedTime: true});
                  this.openTime();
                }}
                onEndEditing={() => { this.setState({isFocusedTime: false}) }}
                value={moment(this.state.date).format("hh:mm A")}
              />
              <Icon name='arrow-drop-down' color={stylesColors.icon_color} size={25} onPress={() => {this.openTime()}} />
            </View>
          </View>
          <View style={styles.colRight}>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={styles.colLeft}>
            <Icon name='autorenew' color={stylesColors.icon_color} size={25} />
          </View>

          <View style={[styles.inputView, styles.dateView, styles.recurringView, this.state.isFocusedDate ? {borderBottomColor:stylesColors.text_input_border_bottom_color_active}: {borderBottomColor:stylesColors.text_input_border_bottom_color} ]}>
            <View>
              <TouchableHighlight
                onPress={() => {this.openRecurring()}}
                underlayColor={stylesColors.button_underlay_color}
                //style={css.addCallHeader.touchable}
              >
                <Text>
                  {recurringString}
                  {
                    /*this.props.addCall.recurring.on === rdOptionRecurring.doNotRepeat ? I18n.t('rdOptionRecurring.doNotRepeat') : (this.props.addCall.recurring.on === rdOptionRecurring.daily ? I18n.t('rdOptionRecurring.daily') : (this.props.addCall.recurring.on === rdOptionRecurring.weekly ? I18n.t('rdOptionRecurring.weekly') : (this.props.addCall.recurring.on === rdOptionRecurring.monthly ? I18n.t('rdOptionRecurring.monthly') : '')))*/
                  }
                </Text>
              </TouchableHighlight>
            </View>
            {/* <TextInput
              style={[styles.input, styles.dateTextInput]} 
              //onChangeText={this.onChange.bind(this)} 
              placeholder="Date"
              placeholderTextColor={stylesColors.place_holder_text_color}
              selectionColor={stylesColors.selection_color}
              //editable={false}
              onFocus={() => {
                this.setState({isFocusedDate: true});
                this.openDate();
              }}
              onEndEditing={() => { this.setState({isFocusedDate: false}) }}
              value={moment(this.state.date).format("MMM DD, YYYY")}
            /> */}
            <Icon name='arrow-drop-down' color={stylesColors.icon_color} size={25} onPress={() => {this.openRecurring();}} />
          </View>

          <View style={styles.colRight}>
          </View>
        </View>

        <View style={[styles.row]}>
          <FlatList
            data={callColorOptions}
            extraData={this.props.addCall.extraData_callColors}
            keyExtractor={this._keyExtractor_callColorsRow}
            renderItem={this._renderItem_callColorsRow}
            horizontal={true}
          />
        </View>

        <View style={[styles.row]}>
          <View style={styles.colLeft}>
            <Icon name='note' color={stylesColors.icon_color} size={25} />
          </View>
          <View style={[styles.inputView, this.state.isFocusedNote ? {borderBottomColor:stylesColors.text_input_border_bottom_color_active}: {borderBottomColor:stylesColors.text_input_border_bottom_color}]}>
            <TextInput
              style={styles.input} 
              //onChangeText={this.onChange.bind(this)} 
              placeholder="Note"
              placeholderTextColor={stylesColors.place_holder_text_color}
              selectionColor={stylesColors.selection_color}
              returnKeyType="next"
              onFocus={() => { this.setState({isFocusedNote: true}) }}
              onEndEditing={() => { this.setState({isFocusedNote: false}) }}
            />
          </View>
          <View style={styles.colRight}>
          </View>
        </View>

      </View>
    )
  }
}