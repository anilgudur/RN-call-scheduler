'use strict';
import { TABLES } from '../constants/index';
import DBService from "./DBService";

class CallService {

  /**
   * Save Call
   */
  saveCall(data) {
    console.log("In Call Service");
    return new Promise((resolve, reject) => {
      // #SQLite
      var querydata = {};
      querydata.tbname = TABLES.TBL_CALL_ADDED;
      querydata.data = data;
      DBService.insertData(querydata).then((res) => {
        if (res < 0) {
          querydata.data = {};
          querydata.columns = [{
            name: 'CompanySN',
            data: data.CompanySN
          }, {
            name: 'UserID',
            data: data.UserID
          }, {
            name: 'Password',
            data: data.Password
          }, {
            name: 'PIN',
            data: data.PIN
          }, {
            name: 'WifiOnly',
            data: data.WifiOnly
            // }, {                                     //Remove the comment once autoUploadPhoto column gets added
            //     name: 'AutoUploadPhoto',
            //     data: data.autoUploadPhoto
          }, {
            name: 'ServiceUserID',
            data: "evosus"
          }, {
            name: 'ServicePassword',
            data: "evosus7414"
          }, {
            name: 'LastReceived',
            data: "2014-05-01T00:00:00Z"
          }];
          querydata.cond = [{
            name: '_id',
            data: 1
          }];
          DBService.updateData(querydata);
          resolve({
            success: true,
            saveType: 'updated'
          });
        } else {
          resolve({
            success: true,
            saveType: 'saved'
          });
        }
      });

      resolve("In Call Service");
    });
  }

}

module.exports = new CallService();