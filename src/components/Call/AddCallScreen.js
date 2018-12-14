import React, { Component } from 'react';
import { View, Text, TextInput, DatePickerAndroid, TimePickerAndroid, TouchableHighlight, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { AddCallHeader } from "../../Header/Headers";
import { Icon, FormValidationMessage } from 'react-native-elements';
import { addCallScreen as styles, colors as stylesColors, global as gStyle } from '../../Styles/Styles';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';
import CallColorsRow from './CallColorsRow';
import { appConsts } from '../../constants';
import { selectContactPhone } from 'react-native-select-contact';
const {
  callColorOptions, rdOptionRecurring, rdOptionRecurringEndDate
} = appConsts;
import ValidationComponent from "../../Validator/index";
import CallService from "../../Services/CallService";

export default class AddCallScreen extends ValidationComponent {

  static propTypes = {
    //screenProps: PropTypes.shape({
    onAddPress: PropTypes.func.isRequired,
    //}).isRequired
  };

  constructor(props) {
    super(props);
    console.log('this.props AddCallScreen =>> ', this.props);

    let todaysDate = new Date();

    this.state = {
      contactName: '',
      phoneNumber: '',
      date: moment(todaysDate).add(1, 'hours').toDate(),
      //date: new Date(),
      // recurring: {
      //   on: 'DO_NOT_REPEAT',
      //   endDate: null,
      // },
      color: 0,
      extraData_callColors: false,
      note: '',

      isFocusedContactName: false,
      isFocusedPhoneNumber: false,
      isFocusedDate: false,
      isFocusedTime: false,
      isFocusedNote: false,

      phoneNumber_error: false,

      phoneNumber_error_message: '',
    }

    this.handleOnPhoneNumberChange = this.handleOnPhoneNumberChange.bind(this);
    this.openDate = this.openDate.bind(this);
    this.openTime = this.openTime.bind(this);
    this.openRecurring = this.openRecurring.bind(this);
    this.onColorSelect = this.onColorSelect.bind(this);
    this.getPhoneNumber = this.getPhoneNumber.bind(this);

    this.onCallSavePressed = this.onCallSavePressed.bind(this);

    this.onAddPress = this.onAddPress.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
  }

  static navigationOptions = ({ navigation, screenProps }) => //(
  {
    const { state, setParams, navigate } = navigation;
    const params = state.params || {};

    return {
      headerLeft: null,
      headerTitle: <AddCallHeader
        navigation={navigation}
        handleOnCallSavePress={params.handleOnCallSavePress}
        titleName={"Privacy Policy"}
      />,
      headerRight: null
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleOnCallSavePress: this.onCallSavePressed
    });
  }

  onCallSavePressed() {

    // Call ValidationComponent validate method
    this.validate({
      phoneNumber: { required: true }
    });

    // Phone Number
    if (this.isFieldInError('phoneNumber')) {
      let errorType = '', errorMessage = '';
      let errorObj = this.getErrorMessage('phoneNumber');
      if (errorObj.messages.required !== undefined) {
        errorType = 'required';
        errorMessage = errorObj.messages.required.replace("{fieldName}", 'Phone number');
      }
      this.setState({
        phoneNumber_error: true,
        phoneNumber_error_message: errorMessage
      });
    } else {
      this.setState({
        phoneNumber_error: false,
        phoneNumber_error_message: '',
      }, () => {
        this.onCallSaveValid(this.isFormValid());
      });
    }

  }

  onCallSaveValid(varIsFormValid) {
    if (varIsFormValid && !this.state.phoneNumber_error) {
      let saveObj = {
        contact_name: this.state.contactName,
        phone_number: this.state.phoneNumber,
        schedule_date: moment(this.state.date).format("YYYY-MM-DD HH:mm:ss"),
        color_type_id: this.state.color,
        note: this.state.note,
        recurring_type_id: this.props.addCall.recurring.on,
        recurring_end_date_type_id: this.props.addCall.recurring.on !== rdOptionRecurring.doNotRepeat ? this.props.addCall.recurring.endDateType : 0,
        recurring_end_date: this.props.addCall.recurring.on !== rdOptionRecurring.doNotRepeat && this.props.addCall.recurring.endDateType === rdOptionRecurringEndDate.endDate ? moment(this.props.addCall.recurring.endDate).format("YYYY-MM-DD") : "",
        weekly: this.props.addCall.recurring.on === rdOptionRecurring.weekly ? this.props.addCall.recurring.weeklyDays : ""
      };
      console.log('Validation success -->> saveObj: ', saveObj);
      CallService.saveCall(saveObj).then((res) => {
        console.log("onCallSaveValid res: ", res);
        if (res.success === true) {
          this.props.onCallSaveSuccessAction();
          this.props.navigation.navigate('CallListRoute');
        }
      }).catch((err) => {
        console.log("onCallSaveValid Error: ", err);
      })
    }
  }

  /**
   * On Phone Number Change
   * @param {*} text - text
   */
  handleOnPhoneNumberChange(text) {
    if (text != "") {
      this.setState({ phoneNumber: text }, () => {

        const regExPhoneNumber = /^[0-9 \+\-\(\)]+$/;
        if (regExPhoneNumber.test(text)) {
          this.setState({ phoneNumber: text }, () => {
            this.validatePhoneNumber();
          });
          this.setState({
            //isOnlyNumberHyphen: true,
            phoneNumber_error: false,
            phoneNumber_error_message: '',
          });
        } else {
          // if (isOnSubmit === true || this.state.phoneNumber_error) {
            this.setState({
              //isOnlyNumberHyphen: false,
              phoneNumber_error: true,
              phoneNumber_error_message: "Phone number should have numbers, - and ( ) only."
            });
          // }
        }
      });
    } else {
        this.setState({ phoneNumber: text }, () => {
          this.validatePhoneNumber();
        });
    }
  }

  /**
   * Validate Phone Number
   */
  validatePhoneNumber() {
    // Call ValidationComponent validate method
    this.validate({
      phoneNumber: { required: true },
    });

    if (this.isFieldInError('phoneNumber')) {
      let errorType = '', errorMessage = '';
      let errorObj = this.getErrorMessage('phoneNumber');
      if (errorObj.messages.required !== undefined) {
        errorType = 'required';
        errorMessage = errorObj.messages.required.replace("{fieldName}", 'Phone number');
      }
      this.setState({
        phoneNumber_error: true,
        phoneNumber_error_message: errorMessage
      });
    } else {
      this.setState({
        phoneNumber_error: false,
        phoneNumber_error_message: '',
      });
    }
  }


  async openDate() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        minDate: new Date(),
        mode: 'spinner',
        date: this.state.date
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ date: new Date(year, month, day, this.state.date.getHours(), this.state.date.getMinutes()) });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  async openTime() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.state.date.getHours(),
        minute: this.state.date.getMinutes(),
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        this.setState({ date: new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate(), hour, minute, 0) });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  openRecurring() {
    //console.log('recurringRoute: ', this.props.navigation);
    this.props.navigation.navigate('RecurringRoute');
  }

  onColorSelect(color) {
    this.setState({
      color: color,
      extraData_callColors: !this.state.extraData_callColors
    });
  }

  _keyExtractor_callColorsRow = (item, index) => index.toString();
  _renderItem_callColorsRow = ({ item, index }) => (
    <CallColorsRow
      id={index}
      index={index}
      item={item}
      color={this.state.color}
      onColorSelect={this.onColorSelect}
    />
  );

  getPhoneNumber() {
    return selectContactPhone()
      .then(selection => {
        if (!selection) {
          return null;
        }

        let { contact, selectedPhone } = selection;
        //console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
        this.setState({
          contactName: contact.name,
          phoneNumber: selectedPhone.number
        }, () => {
          this.handleOnPhoneNumberChange(selectedPhone.number)
        });
        return selectedPhone.number;
      });
  }




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
    switch (this.props.addCall.recurring.on) {
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
    switch (this.props.addCall.recurring.endDateType) {
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
          <View style={[styles.inputView, this.state.isFocusedContactName ? { borderBottomColor: stylesColors.text_input_border_bottom_color_active } : { borderBottomColor: stylesColors.text_input_border_bottom_color }]}>
            <TextInput
              style={styles.input}
              placeholder="Contact name"
              placeholderTextColor={stylesColors.place_holder_text_color}
              selectionColor={stylesColors.selection_color}
              editable={false}
              value={this.state.contactName}
              maxLength={110}
            />
          </View>
          <View style={styles.colRight}>
            <Icon name='person-add' color={stylesColors.icon_color} size={25} onPress={() => { this.getPhoneNumber() }} />
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={styles.colLeft}>
            <Icon name='call' color={stylesColors.icon_color} size={25} />
          </View>
          <View style={[styles.inputView, this.state.isFocusedPhoneNumber ? { borderBottomColor: stylesColors.text_input_border_bottom_color_active } : { borderBottomColor: stylesColors.text_input_border_bottom_color }]}>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor={stylesColors.place_holder_text_color}
              selectionColor={stylesColors.selection_color}
              keyboardType="numeric"
              returnKeyType="next"
              onFocus={() => { this.setState({ isFocusedPhoneNumber: true }) }}
              onEndEditing={() => { this.setState({ isFocusedPhoneNumber: false }) }}
              value={this.state.phoneNumber}
              //onChangeText={(phoneNumber) => this.setState({phoneNumber})}
              onChangeText={(text) => this.handleOnPhoneNumberChange(text)}
              maxLength={20}
            />
          </View>

          <View style={styles.colRight}>
          </View>
        </View>

        {
          this.state.phoneNumber_error &&
          <View style={[styles.row, styles.firstRow, {paddingTop:0}]}>
            <View style={styles.colLeft}>
            </View>
            <View style={{flex:1}}>
              <FormValidationMessage
                labelStyle={gStyle.formValidationMessage}
              >
                {
                  this.state.phoneNumber_error_message
                }
              </FormValidationMessage>
            </View>
            <View style={styles.colRight}>
            </View>
          </View>
        }

        <View style={[styles.row]}>
          <View style={styles.colLeft}>
            <Icon name='event' color={stylesColors.icon_color} size={25} />
          </View>
          <View style={styles.dateTimeContainer}>
            <View style={[styles.inputView, styles.dateView, this.state.isFocusedDate ? { borderBottomColor: stylesColors.text_input_border_bottom_color_active } : { borderBottomColor: stylesColors.text_input_border_bottom_color }]}>
              <TextInput
                style={[styles.input, styles.dateTextInput]}
                //onChangeText={this.onChange.bind(this)} 
                placeholder="Date"
                placeholderTextColor={stylesColors.place_holder_text_color}
                selectionColor={stylesColors.selection_color}
                //editable={false}
                onFocus={() => {
                  this.setState({ isFocusedDate: true });
                  this.openDate();
                }}
                onEndEditing={() => { this.setState({ isFocusedDate: false }) }}
                value={moment(this.state.date).format("MMM DD, YYYY")}
              />
              <Icon name='arrow-drop-down' color={stylesColors.icon_color} size={25} onPress={() => { this.openDate(); }} />
            </View>

            <View style={[styles.inputView, styles.timeView, this.state.isFocusedTime ? { borderBottomColor: stylesColors.text_input_border_bottom_color_active } : { borderBottomColor: stylesColors.text_input_border_bottom_color }]}>
              <TextInput
                style={[styles.input, styles.dateTextInput]}
                //onChangeText={this.onChange.bind(this)} 
                placeholder="Date"
                placeholderTextColor={stylesColors.place_holder_text_color}
                selectionColor={stylesColors.selection_color}
                //editable={false}
                onFocus={() => {
                  this.setState({ isFocusedTime: true });
                  this.openTime();
                }}
                onEndEditing={() => { this.setState({ isFocusedTime: false }) }}
                value={moment(this.state.date).format("hh:mm A")}
              />
              <Icon name='arrow-drop-down' color={stylesColors.icon_color} size={25} onPress={() => { this.openTime() }} />
            </View>
          </View>
          <View style={styles.colRight}>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={styles.colLeft}>
            <Icon name='autorenew' color={stylesColors.icon_color} size={25} />
          </View>

          <View style={[styles.inputView, styles.dateView, styles.recurringView, this.state.isFocusedDate ? { borderBottomColor: stylesColors.text_input_border_bottom_color_active } : { borderBottomColor: stylesColors.text_input_border_bottom_color }]}>
            <View>
              <TouchableHighlight
                onPress={() => { this.openRecurring() }}
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
            <Icon name='arrow-drop-down' color={stylesColors.icon_color} size={25} onPress={() => { this.openRecurring(); }} />
          </View>

          <View style={styles.colRight}>
          </View>
        </View>

        <View style={[styles.row]}>
          <FlatList
            data={callColorOptions}
            extraData={this.state.extraData_callColors}
            keyExtractor={this._keyExtractor_callColorsRow}
            renderItem={this._renderItem_callColorsRow}
            horizontal={true}
          />
        </View>

        <View style={[styles.row]}>
          <View style={styles.colLeft}>
            <Icon name='note' color={stylesColors.icon_color} size={25} />
          </View>
          <View style={[styles.inputView, this.state.isFocusedNote ? { borderBottomColor: stylesColors.text_input_border_bottom_color_active } : { borderBottomColor: stylesColors.text_input_border_bottom_color }]}>
            <TextInput
              style={styles.input}
              //onChangeText={this.onChange.bind(this)} 
              placeholder="Note"
              placeholderTextColor={stylesColors.place_holder_text_color}
              selectionColor={stylesColors.selection_color}
              returnKeyType="next"
              onFocus={() => { this.setState({ isFocusedNote: true }) }}
              onEndEditing={() => { this.setState({ isFocusedNote: false }) }}
              value={this.state.note}
              onChangeText={(note) => this.setState({note})}
              maxLength={255}
            />
          </View>
          <View style={styles.colRight}>
          </View>
        </View>

      </View>
    )
  }
}