import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { global as globalStyle } from "../../Styles/Styles";

/**
 * My App Text
 */
export class LoadingComponent extends Component {
  render() {
    return (
      <View style={globalStyle.loading}>
        <ActivityIndicator size="large" color="#89BE4D" />
      </View>
    );
  }
}
