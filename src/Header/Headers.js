import React, { Component } from "react";
import * as css from "../Styles/Styles";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { Header } from "react-navigation";
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from "react-native-elements";
import Touchable from "react-native-platform-touchable";
// import ScheduleTimer from '../ScheduleTimer/ScheduleTimer';

/**
 * Header Title
 */
export class HeaderTitle extends Component {
  render() {
    return (
      <View style={[css.headers.title_view]}>
        <Text style={[css.headers.text]} numberOfLines={1}>
          {this.props.titleName}
        </Text>
      </View>
    );
  }
}

/**
 * Menu Title
 */
export class MenuTitle extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={css.headers.container}>
        <View style={[css.headers.title_view]}>
          <Text style={[css.headers.text]} numberOfLines={1}>
            {this.props.titleName}
          </Text>
        </View>
        {/* <View>
          <Icon
            name="add"
            color="white"
            size={25}
            onPress={() => navigate("AddCallRoute")}
          />
        </View> */}
      </View>
    );
  }
}

/**
 * Menu Title
 */
export class AddCallHeader extends Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    //console.log("AddCallHeader this.props: ", this.props);
    return (
      <View style={css.addCallHeader.container}>
        <View style={css.addCallHeader.block}>
          <Touchable
            onPress={() => goBack(null)}
            style={[
              {
                padding: 10,
                borderRadius: 30,
                flex: 1
              },
              css.addCallHeader.touchable
            ]}
            background={Touchable.Ripple(
              css.colors.touchable_ripple_error_color,
              true
            )}
          >
            <View style={css.addCallHeader.touchableView}>
              <Icon
                name="clear"
                color={css.colors.header_icon_color}
                size={25}
              />
              <Text style={css.addCallHeader.text} numberOfLines={1}>
                Discard
              </Text>
            </View>
          </Touchable>
        </View>
        <View style={css.addCallHeader.block}>
          <Touchable
            onPress={() => this.props.handleOnCallSavePress()}
            style={[
              {
                padding: 10,
                borderRadius: 30,
                flex: 1
              },
              css.addCallHeader.touchable
            ]}
            background={Touchable.Ripple(
              css.colors.touchable_ripple_success_color,
              true
            )}
          >
            <View style={css.addCallHeader.touchableView}>
              <Icon
                name="done"
                color={css.colors.header_icon_color}
                size={25}
              />
              <Text style={css.addCallHeader.text} numberOfLines={1}>
                Done
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

/**
 * Menu Title
 */
/*export class MenuTitle extends Component {
  render() {
    const { state } = this.props.navigation;
    var addOnStyle = this.props.addOnStyle != undefined ? this.props.addOnStyle : {};
    var isOnRightScheduleHomeTimer = this.props.isOnRightScheduleHomeTimer != undefined ? this.props.isOnRightScheduleHomeTimer : false;
    var addOnStyle2 = isOnRightScheduleHomeTimer === true ? { marginRight:20 } : {};
    return (
      <View style={[css.headerTwo.title_view, addOnStyle, addOnStyle2]}>
        <Text style={[css.headerTwo.text]} numberOfLines={1}>{this.props.titleName}</Text>
      </View>
    )
  }
}*/

/**
 * Menu Icon
 */
export class MenuIcon extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={css.header.container_view}>
        <Touchable
          {...this.props}
          style={{
            padding: 10,
            borderRadius: 30
          }}
          background={Touchable.Ripple(css.colors.touchable_ripple_color, true)}
        >
          <Icon name="menu" color="white" size={25} />
        </Touchable>
      </View>
    );
  }
}

/**
 * Back Icon
 */
export class BackIcon extends Component {
  render() {
    return (
      <View style={css.header.container_view}>
        <Touchable
          {...this.props}
          style={{
            padding: 10,
            borderRadius: 30
          }}
          background={Touchable.Ripple(css.colors.touchable_ripple_color, true)}
        >
          <Icon name="arrow-back" color="white" size={25} />
        </Touchable>
      </View>
    );
  }
}
