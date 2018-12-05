import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
//import KeepAwake from 'react-native-keep-awake';
import PropTypes from 'prop-types';

import { createRootNavigator } from '../../Navigation';
import RtcStatusBar from '../../components/baseComponents/RtcStatusBar';
//import { withoutHandleBackPress } from '../../decorators/withoutBackPress';

// Services
import AppService from "../../Services/AppService";
import DB from "../../Services/DBDefinitionService";

const BG_WHITE_OPACITY = 'rgba(0, 0, 0, 0.7)'; //'rgba(68, 68, 68, 1)'

let db;

//@withoutHandleBackPress
export default class Application extends PureComponent {
  static propTypes = {
    initialUser: PropTypes.shape({}),
  };

  componentDidMount() {

    // SQLite Database
    AppService.getDbVersion().then((dbVersion) => {
      let isDbVersionChanged = true;
      console.log('dbVersion: ', dbVersion);
      if (dbVersion) {
          // if (dbVersion == DB_CONFIG.dbVersion) {
          //     isDbVersionChanged = false;
          // }
      }
      if (isDbVersionChanged === true) {
        // AppService.saveDbVersion(DB_CONFIG.dbVersion).then((result) => {
        //   //this.DBInit(isDbVersionChanged);
        // });
      } else {
        //this.DBInit(isDbVersionChanged);
      }
    }).catch(error => {
      console.log('dbVersion error:: ', error);
      this.DBInit(true);
    });

    // device never go to sleep mode
    //KeepAwake.activate();
  }

  componentWillUnmount() {
    //KeepAwake.deactivate();
  }

  /**
   * Database Initialization
   * @param {*} isDbVersionChanged - is Db Version Changed
   */
  async DBInit(isDbVersionChanged) {
    console.log('isDbVersionChanged ', isDbVersionChanged);
    await DB.init(isDbVersionChanged).then((res) => {
      console.log('DB.init( success ', res);
      
      /* appService.device_info_save().then((res) => {

        // Check screen
        appService.getTnCInfo((err, isTnCAccepted) => {
          if (err == null) {
            setupService.isSetupEmpty().then((result) => {
              if (result) {
                this.setState({ setupOrScheduleRoute: 'SetupStackRoute', checkedApp: true, isTnCAccepted: isTnCAccepted });
              } else {
                this.setState({ setupOrScheduleRoute: 'ScheduleListingkRoute', checkedApp: true, isTnCAccepted: isTnCAccepted });
              }
            });
          } else {
            this.setState({
              checkedApp: true, isTnCAccepted: false
            });
          }
        });
        // End: Check screen

      }).catch((err) => {
      });
      */

    }).catch((err) => {
      console.log('DB.init( error ', err);
    });

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