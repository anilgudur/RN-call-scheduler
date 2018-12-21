import React, {Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'react-native-elements';
import { call_listing_screen as listingStyles, addCallScreen as styles, colors as stylesColors } from '../../Styles/Styles';
import { appConsts } from '../../constants';
import moment from 'moment';
import Communications from 'react-native-communications';
const {
  callColorOptions, callColors
} = appConsts;

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
  }

  constructor(props) {
    super(props);

    //this.onColorSelect = this.onColorSelect.bind(this);
  }

  // onColorSelect(color) {
  //   this.props.onColorSelect(color);
  // }

  render() {
    const item = this.props.item;
    const keyColor = Object.keys(item)[0];
    const valColor = Object.values(item)[0];
    let varColor = callColors[keyColor];
    let name = item.contact_name;
    let iconName = '';
    let nameSep = name.split(' ', 1);
    nameSep.forEach(r => {
      iconName = iconName + r.charAt(0).toUpperCase(r);
    });

    // Get color
    const result = callColorOptions.find(function(value, index) {
      return Object.values(value)[0] === item.color_type_id
    });
    let color = Object.keys(result)[0];



    return (
      <View style={[listingStyles.task_block, {justifyContent:'center', alignItems:'center', height:70, }]}>
        <View style={{
          //flex:1
          paddingRight:10,
          paddingTop:6,
          alignContent: 'center',
          }}>
          <Avatar
            small
            rounded
            title={iconName}
            onPress={() => { console.log('pressed details icon'); }}
            activeOpacity={1.0}
            titleStyle={{fontSize:12}}
            containerStyle={{marginLeft:6, }}
            overlayContainerStyle={[{backgroundColor: callColors[color]}, {width:30, height:30, color:'red',}]}
            titleStyle={callColors[color] === '#FFFFFF' ? {color:'#000000'} : {color:'#FFFFFF'}}
          />
        </View>
        <View style={{
          flex:1,
          flexDirection:'column', paddingRight:20,
        }}>
          <TouchableHighlight
            onPress={() => { console.log('pressed details'); }}
            underlayColor={stylesColors.button_underlay_color}
            //style={css.addCallHeader.touchable}
          >
            <View>
              <View>
                <Text style={{fontSize:14}} numberOfLines={1}>{item.contact_name || 'Default'} asdad asd asd asd asd asd asd asd asd</Text>
              </View>
              <View>
                <Text style={{fontSize:12}} numberOfLines={1}>{item.phone_number} asdad asd asd asd asd asd asd asd asd</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                {
                  item.recurring_type_id !== 1 && 
                  <Icon name="autorenew" color='#666666' size={15} />
                }
                <Text style={{fontSize:10, paddingLeft:5}} numberOfLines={1}>{item.note} asdad asd asd asd asd asd asd asd asd</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{width:30}}>
          <Icon name="more-vert" color='#333333' size={20} />
        </View>
        <View style={{width:55}}>
          <Text style={{fontSize:11}}>{moment(item.schedule_date).format("hh:mm A")}</Text>
        </View>
        <View style={{width:40, height:68, justifyContent:'center'}}>
          <TouchableHighlight
            onPress={() => { Communications.phonecall(item.phone_number, true); }}
            underlayColor={stylesColors.button_underlay_color}
            //style={css.addCallHeader.touchable}
          >
            <Icon name="call" color='#333333' size={20} containerStyle={{}} />
          </TouchableHighlight>
        </View>
      </View>
      // <Icon name={this.props.color == valColor ? 'check-circle' : 'fiber-manual-record'} color={varColor} size={45}
      // onPress={() => {this.onColorSelect(valColor);}}
      // />
    )
  }
}