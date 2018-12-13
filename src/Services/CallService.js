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
      console.log('querydata:: ', querydata);
      DBService.insertData(querydata).then((res) => {
        console.log('CallService saveCall: ', res);
        resolve({
          success: true,
          saveType: 'SAVED'
        });
      }).catch(err => {
        console.log("CallService saveCall Error: ", err);
        reject(err);
      });
    });
  }

  /*
   * Get Call List
   */
  getCallList() {
    console.log("In getCallList");
    return new Promise((resolve, reject) => {

      try {
        let querydata = {};
        querydata.tbname = TABLES.TBL_CALL_ADDED;
        querydata.columns = [
            '_id',
            'contact_name',
            'phone_number',
            'schedule_date',
            'color_type_id',
            'note',
            'recurring_type_id',
            'recurring_end_date_type_id',
            'recurring_end_date',
            'weekly',
            'is_call_completed'
        ];
        // querydata.cond = [
        //   {name: 'is_call_completed', data: 0}
        // ];
        DBService.getDataList(querydata, 'schedule_date').then((result) => {
          console.log('result:: ', result);
          resolve('result:: ', result);
        }).catch(err => {
          console.log('=====>>>>> err:: ', err);
          reject(err);
        });
      } catch (err) {
        reject(false);
      }

    });
  }

}

module.exports = new CallService();