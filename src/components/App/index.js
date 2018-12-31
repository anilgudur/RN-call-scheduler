import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
//import KeepAwake from 'react-native-keep-awake';
import PropTypes from "prop-types";

import { createRootNavigator } from "../../Navigation";
import RtcStatusBar from "../../components/baseComponents/RtcStatusBar";
//import { withoutHandleBackPress } from '../../decorators/withoutBackPress';

// Services
import AppService from "../../Services/AppService";
import DB from "../../Services/DBDefinitionService";

import { DB_CONFIG } from "../../Config/DBConfig";

const BG_WHITE_OPACITY = "rgba(0, 0, 0, 0.7)"; //'rgba(68, 68, 68, 1)'

let db;

//@withoutHandleBackPress
export default class Application extends PureComponent {
  static propTypes = {
    initialUser: PropTypes.shape({})
  };

  constructor(props) {
    super(props);

    this.state = {
      isAppLoaded: false
    };
  }

  componentDidMount() {
    // SQLite Database
    AppService.getDbVersion()
      .then(dbVersion => {
        let isDbVersionChanged = true;
        console.log("db -> dbVersion: ", dbVersion);
        if (dbVersion) {
          if (dbVersion === DB_CONFIG.dbVersion) {
            isDbVersionChanged = false;
          }
        }
        if (isDbVersionChanged === true) {
          AppService.saveDbVersion(DB_CONFIG.dbVersion).then(result => {
            this.DBInit(isDbVersionChanged)
              .then(res => {
                this.setState({ isAppLoaded: true });
              })
              .catch(err => {
                this.setState({ isAppLoaded: true });
              });
          });
        } else {
          this.DBInit(isDbVersionChanged)
            .then(res => {
              this.setState({ isAppLoaded: true });
            })
            .catch(err => {
              this.setState({ isAppLoaded: true });
            });
        }
      })
      .catch(error => {
        console.log("db -> dbVersion error:: ", error);
        this.DBInit(true)
          .then(res => {
            this.setState({ isAppLoaded: true });
          })
          .catch(err => {
            this.setState({ isAppLoaded: true });
          });
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
  DBInit(isDbVersionChanged) {
    console.log("db -> isDbVersionChanged ", isDbVersionChanged);
    return new Promise((resolve, reject) => {
      try {
        DB.init(isDbVersionChanged)
          .then(res => {
            console.log("db -> DB.init( success ", res);

            if (isDbVersionChanged === true) {
              AppService.saveDbVersion(DB_CONFIG.dbVersion)
                .then(result => {
                  resolve(true);
                })
                .catch(err => {
                  reject(err);
                });
            } else {
              resolve(true);
            }

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
          })
          .catch(err => {
            console.log("db -> DB.init( error ", err);
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  render() {
    const Layout = createRootNavigator(this.props.initialUser.user);
    return (
      // <Layout />
      this.state.isAppLoaded ? (
        <View style={styles.container}>
          <RtcStatusBar
            backgroundColor={BG_WHITE_OPACITY}
            barStyle="dark-content"
          />
          <Layout />
        </View>
      ) : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    zIndex: 1
  }
});
