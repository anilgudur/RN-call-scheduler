import React, { Component } from "react";
import { Text } from "react-native";
import { AppTextStyle } from "../../Styles/Styles";

/**
 * My App Text
 */
export class MyAppText extends Component {
  render() {
    return (
      <Text style={AppTextStyle.MyAppText} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

export class CallListPhoneText extends Component {
  render() {
    return (
      <Text style={AppTextStyle.CallListPhoneText} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

export class CallListNoteText extends Component {
  render() {
    return (
      <Text style={AppTextStyle.CallListNoteText} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

export class aaText extends Component {
  render() {
    return (
      <Text style={AppTextStyle.CallListNoteText} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}
