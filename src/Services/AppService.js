'use strict';

import { STORAGE_KEYS } from '../constants/index';
import StorageService from "./StorageService";

/**
 * App Service
 */
class AppService {

    /**
     * Get Db Version
     */
    getDbVersion() {
      return new Promise((resolve, reject) => {
        let keyName = STORAGE_KEYS.DB_VERSION;
        StorageService.get(keyName).then((dbVersion) => {
          if (dbVersion !== null) {
            resolve(dbVersion);
          } else {
            reject({errorMessage:"Key not found."});
          }
        }).catch((error) => {
          reject(error);
        });
      });
  }

  /**
   * Save Db Version
   */
  saveDbVersion = (dbVersion, cb) => {
    // #AsyncStorage save data
    return new Promise((resolve, reject) => {
      var para = {
        keyName: STORAGE_KEYS.DB_VERSION,
        data: dbVersion
      };
      StorageService.save(para).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

}

module.exports = new AppService();