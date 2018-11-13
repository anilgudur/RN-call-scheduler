import React, {Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { addCallScreen as styles, colors as stylesColors } from '../../Styles/Styles';
import { appConsts } from '../../constants';
const {
  callColors
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

export default class CallColorsRow extends Component {

  static propTypes = {
    //item: PropTypes.arrayOf(PropTypes.object).isRequired,
    //item: PropTypes.array.isRequired,

    onColorSelect: PropTypes.func.isRequired,
    //onColorSelect_Back: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.onColorSelect = this.onColorSelect.bind(this);
    console.log('CallColorsRow -> this.props.item: ', this.props.item);
    console.log('CallColorsRow -> this.props: ', this.props);
  }

  onColorSelect(color) {
    console.log('CallColorsRow -> this.props.item: ', this.props.item);
    this.props.onColorSelect(color);
  }
  //<TouchableHighlight style={styles.doneButton} onPress={this.onDonePressed}></TouchableHighlight>

  render() {
    const item = this.props.item;
    const keyColor = Object.keys(item)[0];
    let varColor = callColors[keyColor];
    console.log('this.props.addCall.color ==> ', this.props.addCall.color);
    console.log('keyColor ::> ', keyColor);

    return (
      <Icon name={this.props.addCall.color == keyColor ? 'check-circle' : 'fiber-manual-record'} color={varColor} size={45}
      onPress={() => {this.onColorSelect(keyColor);}}
      />
    )
  }
}