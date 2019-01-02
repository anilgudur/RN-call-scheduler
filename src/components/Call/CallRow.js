import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { Avatar, Icon } from "react-native-elements";
import {
  call_listing_screen as listingStyles,
  addCallScreen as styles,
  colors as stylesColors
} from "../../Styles/Styles";
import { appConsts } from "../../constants";
import moment from "moment";
import Communications from "react-native-communications";
import Touchable from "react-native-platform-touchable";
import OptionsMenu from "react-native-options-menu";
const { callColorOptions, callColors } = appConsts;
import {
  MyAppText,
  CallListPhoneText,
  CallListNoteText
} from "../AppText/AppText";

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#e7e7e7',
//     padding: 20,
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     marginLeft: 20,
//     marginRight: 20
//   },
//   label: {
//     fontSize: 20,
//     fontWeight: '300'
//   },
//   doneButton: {
//     borderRadius: 5,
//     backgroundColor: '#EAEAEA',
//     padding: 5,
//   }
// });

export default class CallRow extends Component {
  static propTypes = {
    //onColorSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
    //console.log("CallRow this.props", this.props);
  }

  // onColorSelect(color) {
  //   this.props.onColorSelect(color);
  // }

  editCall = item => {
    this.props.screenProps.editCallAction(item);
    this.props.screenProps.navigation.navigate("AddCallRoute", item);
  };

  moveToCompleted = item => {
    this.props.onMoveToCompletedPressed(item);
  };

  deleteCall = item => {
    this.props.onDeleteCallPressed(item);
  };

  render() {
    const item = this.props.item;
    const keyColor = Object.keys(item)[0];
    const valColor = Object.values(item)[0];
    let varColor = callColors[keyColor];
    let name = item.contact_name;
    let iconName = "";
    let nameSep = name.split(" ", 1);
    nameSep.forEach(r => {
      iconName = iconName + r.charAt(0).toUpperCase(r);
    });

    // Get color
    const result = callColorOptions.find(function(value, index) {
      return Object.values(value)[0] === item.color_type_id;
    });
    let color = Object.keys(result)[0];

    return (
      <View
        style={[
          listingStyles.task_block,
          { justifyContent: "center", alignItems: "center", height: 70 }
        ]}
      >
        <View
          style={{
            //flex:1
            paddingRight: 15,
            paddingTop: 6,
            alignContent: "center"
          }}
        >
          <Avatar
            small
            rounded
            title={iconName}
            onPress={() => {
              console.log("pressed details icon");
            }}
            activeOpacity={1.0}
            titleStyle={[
              { fontSize: 22, fontFamily: "Roboto-Light" },
              callColors[color] === "#FFFFFF"
                ? { color: "#000000" }
                : { color: "#FFFFFF" }
            ]}
            containerStyle={{ marginLeft: 6 }}
            overlayContainerStyle={[
              { backgroundColor: callColors[color] },
              { width: 35, height: 35, color: "red" }
            ]}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            paddingRight: 10
          }}
        >
          <TouchableHighlight
            onPress={() => {
              console.log("pressed details");
            }}
            underlayColor={stylesColors.button_underlay_color}
            //style={css.addCallHeader.touchable}
          >
            <View>
              <View>
                <MyAppText numberOfLines={1}>
                  {item.contact_name || "Default"}
                </MyAppText>
              </View>
              <View>
                <CallListPhoneText numberOfLines={1}>
                  {item.phone_number}
                </CallListPhoneText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                {item.recurring_type_id !== 1 && (
                  <Icon
                    name='autorenew'
                    color='#01C853'
                    size={15}
                    containerStyle={[
                      item.recurring_type_id !== 1 ? { paddingRight: 5 } : {}
                    ]}
                  />
                )}
                <CallListNoteText numberOfLines={1}>
                  {item.note}
                </CallListNoteText>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ width: 40 }}>
          <OptionsMenu
            //customButton={<Icon name="more-vert" color="#333333" size={20} />}
            customButton={<Icon name='more-vert' color='#7F8C8D' size={20} />}
            destructiveIndex={1}
            options={["Edit", "Move to Completed", "Delete"]}
            actions={[
              () => this.editCall(item),
              () => this.moveToCompleted(item),
              () => this.deleteCall(item)
            ]}
          />
        </View>
        <View style={{ width: 55 }}>
          <CallListPhoneText>
            {moment(item.schedule_date).format("hh:mm A")}
          </CallListPhoneText>
        </View>
        <View style={{ width: 50, height: 68, justifyContent: "center" }}>
          <Touchable
            onPress={() => {
              Communications.phonecall(item.phone_number, true);
            }}
            style={{
              padding: 10,
              borderRadius: 30
            }}
            background={Touchable.Ripple("blue", true)}
          >
            <Icon name='call' color='#4C4C4C' size={20} containerStyle={{}} />
          </Touchable>
        </View>
      </View>
      // <Icon name={this.props.color == valColor ? 'check-circle' : 'fiber-manual-record'} color={varColor} size={45}
      // onPress={() => {this.onColorSelect(valColor);}}
      // />

      //<TouchableHighlight
      //  onPress={() => { Communications.phonecall(item.phone_number, true); }}
      //  underlayColor={stylesColors.button_underlay_color}
      //  //style={css.addCallHeader.touchable}
      //>
      //  <Icon name="call" color='#333333' size={20} containerStyle={{}} />
      //</TouchableHighlight>
    );
  }
}
