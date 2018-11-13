import React, { Component } from 'react';
import { BackHandler } from 'react-native';

export const withoutHandleBackPress = (TargetClass) => {
  return class extends TargetClass {
    constructor(...props) {
      super(...props);
    }

    componentDidMount() {
      super.componentDidMount();
      BackHandler.addEventListener('hardwareBackPress', this._handleHardwareBackPress);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      BackHandler.removeEventListener('hardwareBackPress', this._handleHardwareBackPress);
    }

    /**
     * Handle event when user press hardware back button on device
     *
     * @private
     */
    _handleHardwareBackPress = () => {
      return true;
    }
  };
};