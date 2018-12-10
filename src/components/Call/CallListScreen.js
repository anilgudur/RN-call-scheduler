import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { MenuIcon, MenuTitle, CallListHeader } from "../../Header/Headers";
import { Icon, FormValidationMessage } from 'react-native-elements';
import { addCallScreen as styles, colors as stylesColors, global as gStyle } from '../../Styles/Styles';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';
import CallColorsRow from './CallColorsRow';
import { appConsts } from '../../constants';
const {
  callColorOptions, rdOptionRecurring, rdOptionRecurringEndDate
} = appConsts;
import CallService from "../../Services/CallService";

export default class AddCallScreen extends Component {

  static propTypes = {
    //screenProps: PropTypes.shape({
    onAddPress: PropTypes.func.isRequired,
    //}).isRequired
  };

  constructor(props) {
    super(props);
    console.log('this.props AddCallScreen =>> ', this.props);

    this.state = {
      contactName: '',
      phoneNumber: '',
      date: new Date(),
      // recurring: {
      //   on: 'DO_NOT_REPEAT',
      //   endDate: null,
      // },
      color: 'white',
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

    // this.handleOnPhoneNumberChange = this.handleOnPhoneNumberChange.bind(this);
    // this.openDate = this.openDate.bind(this);
    // this.openTime = this.openTime.bind(this);
    // this.openRecurring = this.openRecurring.bind(this);
    // this.onColorSelect = this.onColorSelect.bind(this);
    // this.getPhoneNumber = this.getPhoneNumber.bind(this);

    // this.onCallSavePressed = this.onCallSavePressed.bind(this);

    // this.onAddPress = this.onAddPress.bind(this);
    // this.onCancelPress = this.onCancelPress.bind(this);
  }

  static navigationOptions = ({ navigation, screenProps }) => //(
  {
    const { navigate } = navigation;
    return {
      headerLeft: <MenuIcon
                      navigation={navigation}
                      onPress={() => navigate('DrawerOpen')}
                  />,
      headerTitle: <MenuTitle
                      navigation={navigation}
                      titleName={"Call Planner"}
                  />,
      headerRight: <Icon name="more-vert" color='white' size={20} />
    }
  };

  componentDidMount() {
    CallService.getCallList().then((res) => {
      
    }).catch(err => {
      console.log('CallService.getCallList() Error:: ', err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Call List Screen</Text>
      </View>
    );
  }

}
