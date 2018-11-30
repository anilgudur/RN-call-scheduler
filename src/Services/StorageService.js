'use strict';

import {
  AsyncStorage
} from 'react-native';
import {
  ERROR_CODES
} from '../constants/index';

class StorageService {

  /**
   * Save
   */
  save(obj) {
    return new Promise((resolve, reject) => {
      if (obj.keyName && obj.data) {
        try {
          AsyncStorage.setItem(obj.keyName, typeof obj.data === 'string' ? obj.data : JSON.stringify(obj.data));
          resolve(true);
        } catch (error) {
          reject(error);
        }
      } else {
        reject({
          errorCode: ERROR_CODES.STORAGE_SERVICE.save,
          errorMessage: 'Storage Service: save - Parameters not set.'
        });
      }
    });
  }

  /**
   * Get
   */
  get(keyName) {
    return new Promise((resolve, reject) => {
      if (typeof keyName === 'string') {
        try {
          let value = AsyncStorage.getItem(keyName); //let value2 = JSON.parse(value);
          if (value !== null) {
            resolve(value);
          } else {
            resolve(null);
          }
          // const value = AsyncStorage.getItem(keyName, (value) => {
          //     JSON.parse(value)
          // });
        } catch (error) {
          reject(error);
        }
      } else {
        reject({
          errorCode: ERROR_CODES.STORAGE_SERVICE.get,
          errorMessage: 'Storage Service: get - Parameter not set.'
        });
      }
    });
  }

  /**
   * Multi Get
   */
  multiGet(arrKeyNames) {
    return new Promise((resolve, reject) => {
      try {
        let value = AsyncStorage.multiGet(arrKeyNames, (err, val) => {
          if (err) {
            //return cb(err); // if error return error on callback function
            reject(err);
          }

          if (!val) {
            //return cb({ errorMessage: "No data found." }); // if empty result return empty on callback function
            reject({
              errorMessage: "No data found."
            });
          }

          var arr = new Array();
          val.map((result, i, valu) => {
            let key = valu[i][0];
            let val2 = valu[i][1];
            arr[key] = val2;
          });
          resolve(arr);

          // // AsynchStorage result is an nested array. UserAuthService is not deal with the nested array
          // // lodash library is used to change the 'nested array' to an 'object'
          // //var zippedObj = zipObject(val);

          // if (!arr[KEY_INTRO_READ]) {
          //     // if empty result return empty on callback function
          //     //return cb({ errorMessage: "Intro key not found." });
          //     reject({ errorMessage: "Intro key not found." });
          // }

          // var isIntroRead = JSON.parse(arr[KEY_INTRO_READ]);

          // //return cb();
          // return cb(null, isIntroRead);
        });
        if (value !== null) {
          resolve(value);
        } else {
          resolve(null);
        }
        // const value = AsyncStorage.getItem(arrKeyName, (value) => {
        //     JSON.parse(value)
        // });
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = new StorageService();