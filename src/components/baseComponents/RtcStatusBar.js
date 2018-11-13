import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const RtcStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

RtcStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default RtcStatusBar;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});