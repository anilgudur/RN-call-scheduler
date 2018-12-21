'use strict';
import {
  TABLES
} from '../constants/index';
import DBService from "./DBService";
import moment from 'moment';
import { appConsts } from '../constants/index';

class CallService {

  /**
   * Save Call
   */
  saveCall(data) {
    console.log("In Call Service");
    return new Promise((resolve, reject) => {
      // #SQLite
      let querydata = {};
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
          //'is_call_completed'
        ];
        // querydata.cond = [
        //   {name: 'is_call_completed', data: 0}
        // ];
        DBService.getDataList(querydata, 'schedule_date').then((result) => {
          console.log('result:: ', result);
          resolve(result);
        }).catch(err => {
          console.log('=====>>>>> err:: ', err);
          reject(err);
        });
      } catch (err) {
        reject(false);
      }

    });
  }

  callListTypeFilter(callArr) {
    return new Promise((resolve, reject) => {
      try {
        const upcomingArr = [];
        const oldArr = [];
        const recurringArr = [];
        const completedArr = [];
        let todaysDate = new Date();
        todaysDate = new Date(
          todaysDate.getFullYear(),
          todaysDate.getMonth(),
          todaysDate.getDate(),
          0,
          0,
          0
        );
        //console.log('todaysDate:: ', todaysDate);
        callArr.forEach(row => {
          let scheduleDate = new Date(row.schedule_date);
          let newRow = "";
          let genDate = "";
          let recurringEndDate = "";

          if (scheduleDate.getTime() >= todaysDate.getTime()) {
            console.log("row", row);

            // Do Not Repeat
            if (row.recurring_type_id === 1) {
              // Upcoming
              newRow = Object.assign({}, row, {
                generatedScheduleDate: scheduleDate
              });
              upcomingArr.push(newRow);
            }

            // Daily
            if (row.recurring_type_id === 2) {
              if (row.recurring_end_date_type_id === 2) {
                recurringEndDate = new Date(row.recurring_end_date);
                if (recurringEndDate.getTime() >= todaysDate.getTime()) {
                  genDate = new Date(
                    todaysDate.getFullYear(),
                    todaysDate.getMonth(),
                    todaysDate.getDate(),
                    todaysDate.getHours(),
                    todaysDate.getMinutes(),
                    0
                  );
                  newRow = Object.assign({}, row, {
                    generatedScheduleDate: genDate
                  });
                  upcomingArr.push(newRow);
                } else {
                  // Old
                  newRow = Object.assign({}, row, {
                    generatedScheduleDate: scheduleDate
                  });
                  oldArr.push(newRow);
                }
              } else {
                // Forever
                genDate = new Date(
                  todaysDate.getFullYear(),
                  todaysDate.getMonth(),
                  todaysDate.getDate(),
                  todaysDate.getHours(),
                  todaysDate.getMinutes(),
                  0
                );
                newRow = Object.assign({}, row, {
                  generatedScheduleDate: genDate
                });
                upcomingArr.push(newRow);
              }
            }

            // Weekly - Recurring
            if (row.recurring_type_id === 3) {
              let isPushWeekly = false;
              if (row.recurring_end_date_type_id === 2) {
                recurringEndDate = new Date(row.recurring_end_date);
                if (recurringEndDate.getTime() >= todaysDate.getTime()) {
                  isPushWeekly = true;
                } else {
                  // Old
                  newRow = Object.assign({}, row, {
                    generatedScheduleDate: scheduleDate
                  });
                  oldArr.push(newRow);
                }
              } else {
                // Forever
                isPushWeekly = true;
              }

              if (isPushWeekly === true) {
                let startWeekDate =
                  scheduleDate.getTime() > todaysDate.getTime() ?
                  scheduleDate :
                  todaysDate;
                let endWeekDate = moment(startWeekDate)
                  .add(6, "days")
                  .toDate();
                endWeekDate = new Date(
                  endWeekDate.getFullYear(),
                  endWeekDate.getMonth(),
                  endWeekDate.getDate(),
                  23,
                  59,
                  59
                );
                //console.log('endWeekDate =====>>>>> ', endWeekDate);
                let weekDaysArr = row.weekly.split(",");
                weekDaysArr = weekDaysArr.map(Number);
                //console.log('weekDaysArr ==>> ', weekDaysArr);
                // Loop through week days
                for (
                  let d = 0, startPointer = startWeekDate.getDay(); d < 7; d++, startPointer++
                ) {
                  if (startPointer > 6) {
                    startPointer = 0;
                  }
                  //console.log('d', d);
                  //console.log('startPointer', startPointer);
                  if (weekDaysArr.includes(startPointer)) {
                    genDate = moment(startWeekDate)
                      .add(d, "days")
                      .toDate();
                    genDate = new Date(
                      genDate.getFullYear(),
                      genDate.getMonth(),
                      genDate.getDate(),
                      scheduleDate.getHours(),
                      scheduleDate.getMinutes(),
                      0
                    );
                    newRow = Object.assign({}, row, {
                      generatedScheduleDate: genDate
                    });
                    upcomingArr.push(newRow);
                    //console.log('newRow|| ', newRow);
                  }
                }
              }
            }

            // Monthly
            if (row.recurring_type_id === 4) {
              var isPushMonthly = false;
              if (row.recurring_end_date_type_id === 2) {
                recurringEndDate = new Date(row.recurring_end_date);
                if (recurringEndDate.getTime() >= todaysDate.getTime()) {
                  isPushMonthly = true;
                } else {
                  // Old
                  newRow = Object.assign({}, row, {
                    generatedScheduleDate: scheduleDate
                  });
                  oldArr.push(newRow);
                }
              } else {
                // Forever
                isPushMonthly = true;
              }
            }
            if (isPushMonthly === true) {
              let monthlyDate =
                scheduleDate.getTime() > todaysDate.getTime() ?
                scheduleDate :
                moment(scheduleDate)
                .add(1, "months")
                .toDate();
              genDate = new Date(
                monthlyDate.getFullYear(),
                monthlyDate.getMonth(),
                monthlyDate.getDate(),
                scheduleDate.getHours(),
                scheduleDate.getMinutes(),
                0
              );
              newRow = Object.assign({}, row, {
                generatedScheduleDate: genDate
              });
              upcomingArr.push(newRow);
            }
          } else {
            // Old
            newRow = Object.assign({}, row, {
              generatedScheduleDate: scheduleDate
            });
            oldArr.push(newRow);
          }

          // Recurring
          if (row.recurring_type_id !== 1) {
            newRow = Object.assign({}, row, {
              generatedScheduleDate: scheduleDate
            });
            recurringArr.push(newRow);
          }

          // Completed
          if (row.call_status === appConsts.callStatus_COMPLETED) {
            newRow = Object.assign({}, row, {
              generatedScheduleDate: scheduleDate
            });
            completedArr.push(newRow);
          }
        });

        // Sort
        upcomingArr.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return (
            new Date(a.generatedScheduleDate) - new Date(b.generatedScheduleDate)
          );
        });
        oldArr.sort(function (a, b) {
          return (
            new Date(b.generatedScheduleDate) - new Date(a.generatedScheduleDate)
          );
        });
        recurringArr.sort(function (a, b) {
          return (
            new Date(b.generatedScheduleDate) - new Date(a.generatedScheduleDate)
          );
        });
        completedArr.sort(function (a, b) {
          return (
            new Date(b.generatedScheduleDate) - new Date(a.generatedScheduleDate)
          );
        });
        console.log("upcomingArr", upcomingArr);
        console.log("oldArr", oldArr);
        console.log("recurringArr", recurringArr);
        console.log("completedArr", completedArr);

        let upcomingDatesArr = [];
        let oldDatesArr = [];
        let recurringDatesArr = [];
        let completedDatesArr = [];
  
        upcomingArr.forEach(row => {
          var date = moment(row.generatedScheduleDate).format("YYYY-MM-DD");
          if (upcomingDatesArr.includes(date) === false) {
            upcomingDatesArr.push(date);
          }
        });
        oldArr.forEach(row => {
          var date = moment(row.generatedScheduleDate).format("YYYY-MM-DD");
          if (oldDatesArr.includes(date) === false) {
            oldDatesArr.push(date);
          }
        });
        recurringArr.forEach(row => {
          var date = moment(row.generatedScheduleDate).format("YYYY-MM-DD");
          if (recurringDatesArr.includes(date) === false) {
            recurringDatesArr.push(date);
          }
        });
        completedArr.forEach(row => {
          var date = moment(row.generatedScheduleDate).format("YYYY-MM-DD");
          if (completedDatesArr.includes(date) === false) {
            completedDatesArr.push(date);
          }
        });

        resolve({
          upcomingArr: upcomingArr,
          oldArr: oldArr,
          recurringArr: recurringArr,
          completedArr: completedArr,

          upcomingDatesArr,
          oldDatesArr,
          recurringDatesArr,
          completedDatesArr
        });
      } catch(err) {
        reject(err);
      }
    });

  }

}

module.exports = new CallService();