import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
//import KeepAwake from 'react-native-keep-awake';
import PropTypes from 'prop-types';

import { createRootNavigator } from '../../Navigation';
import RtcStatusBar from '../../components/baseComponents/RtcStatusBar';
//import { withoutHandleBackPress } from '../../decorators/withoutBackPress';

const BG_WHITE_OPACITY = 'rgba(0, 0, 0, 0.7)'; //'rgba(68, 68, 68, 1)'

//@withoutHandleBackPress
export default class Application extends PureComponent {
  static propTypes = {
    initialUser: PropTypes.shape({}),
  };

  componentDidMount() {
    // device never go to sleep mode
    //KeepAwake.activate();
  }

  componentWillUnmount() {
    //KeepAwake.deactivate();
  }

  render() {
    const Layout = createRootNavigator(this.props.initialUser.user);
    return (
      // <Layout />
      <View style={styles.container}>
        <RtcStatusBar backgroundColor={BG_WHITE_OPACITY} barStyle="dark-content" />
        <Layout />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
});