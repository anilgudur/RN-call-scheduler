import React, { Component } from 'react';
import * as css from '../Styles/Styles';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, Platform } from 'react-native';
import { Header } from 'react-navigation';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
// import ScheduleTimer from '../ScheduleTimer/ScheduleTimer';

/**
 * Menu Title
 */
export class MenuTitle extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={css.headers.container}>
        <View style={[css.headers.title_view]}>
          <Text style={[css.headers.text]} numberOfLines={1}>{this.props.titleName}</Text>
        </View>
        <View>
          <Icon name='add' color='white' size={25} onPress={() => navigate('AddCallRoute')} />
        </View>
      </View>
    )
  }
}

/**
 * Menu Title
 */
export class AddCallHeader extends Component {
  render() {
    const { navigate } = this.props.navigation;
    console.log('AddCallHeader this.props: ', this.props);
    return (
      <View style={css.addCallHeader.container}>
        <View style={css.addCallHeader.block}>
          <TouchableHighlight
            onPress={() => console.log('pressed')}
            underlayColor={css.colors.button_underlay_color}
            style={css.addCallHeader.touchable}
          >
            <View style={css.addCallHeader.touchableView}>
              <Icon name='clear' color={css.colors.header_icon_color} size={25} />
              <Text style={css.addCallHeader.text} numberOfLines={1}>
                Discard
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={css.addCallHeader.block}>
          <TouchableHighlight
            onPress={() => this.props.handleOnCallSavePress()}
            underlayColor={css.colors.button_underlay_color}
            style={css.addCallHeader.touchable}
          >
            <View style={css.addCallHeader.touchableView}>
              <Icon name='done' color={css.colors.header_icon_color} size={25} />
              <Text style={css.addCallHeader.text} numberOfLines={1}>
                Done
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
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
        <TouchableOpacity
            {...this.props}
            underlayColor='#FFFFFF'
            style={{ padding:5, }}
        >
          <Icon name='menu' color='white' size={25} />
        </TouchableOpacity>
      </View>
    )
  }
}