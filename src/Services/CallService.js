"use strict";
import { TABLES } from "../constants/index";
import DBService from "./DBService";
import moment from "moment";
import { appConsts } from "../constants/index";

class CallService {
  /**
   * Save Call
   */
  saveCall(data) {
    console.log("In Call Service");
    return new Promise((resolve, reject) => {
      // Add - #SQLite
      let querydata = {};
      querydata.tbname = TABLES.TBL_CALL_ADDED;
      querydata.data = data;
      console.log("querydata:: ", querydata);
      DBService.insertData(querydata)
        .then(res => {
          console.log("CallService saveCall: ", res);
          resolve({
            success: true,
            saveType: "SAVED"
          });
        })
        .catch(err => {
          console.log("CallService saveCall Error: ", err);
          reject(err);
        });
    });
  }

  updateCall(data, id) {
    return new Promise((resolve, reject) => {
      var querydata = {};
      querydata.tbname = TABLES.TBL_CALL_ADDED;
      querydata.cond = [
        {
          name: "_id",
          data: id
        }
      ];
      querydata.columns = data;
      DBService.updateData(querydata)
        .then(res => {
          console.log("CallService updateCall: ", res);
          resolve({
            success: true,
            saveType: "UPDATED"
          });
        })
        .catch(err => {
          console.log("CallService updateCall Error: ", err);
          reject(err);
        });
    });
  }

  deleteCall(item) {
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM ${TABLES.TBL_CALL_ADDED} WHERE _id=${item._id}`;
      DBService.runQuery(query)
        .then(res => {
          console.log("CallService updateCall: ", res);
          resolve({
            success: true,
            saveType: "DELETED"
          });
        })
        .catch(err => {
          console.log("CallService updateCall Error: ", err);
          reject(err);
        });
    });
  }

  moveToCompleted(item) {
    return new Promise((resolve, reject) => {
      var querydata = {};
      querydata.tbname = TABLES.TBL_CALL_ADDED;
      querydata.cond = [
        {
          name: "_id",
          data: item._id
        }
      ];
      querydata.columns = [
        {
          name: "call_status",
          data: appConsts.callStatus_COMPLETED
        }
      ];
      DBService.updateData(querydata)
        .then(res => {
          console.log("CallService moveToCompleted: ", res);
          resolve({
            success: true,
            saveType: "UPDATED"
          });
        })
        .catch(err => {
          console.log("CallService moveToCompleted Error: ", err);
          reject(err);
        });
    });
  }

  /*
   * Get Call List
   */
  getCallList() {
    //console.log("In getCallList");
    return new Promise((resolve, reject) => {
      try {
        let querydata = {};
        querydata.tbname = TABLES.TBL_CALL_ADDED;
        querydata.columns = [
          "_id",
          "contact_name",
          "phone_number",
          "schedule_date",
          "color_type_id",
          "note",
          "recurring_type_id",
          "recurring_end_date_type_id",
          "recurring_end_date",
          "weekly",
          "call_status"
        ];
        // querydata.cond = [
        //   {name: 'is_call_completed', data: 0}
        // ];
        DBService.getDataList(querydata, "schedule_date")
          .then(result => {
            //console.log('result:: ', result);
            resolve(result);
          })
          .catch(err => {
            console.log("=====>>>>> err:: ", err);
            reject(err);
          });
      } catch (err) {
        reject(false);
      }
    });
  }

  async callListTypeFilterAW(callArr, type) {
    try {
      let upcomingArr = [],
        oldArr = [],
        recurringArr = [],
        completedArr = [];
      let upcomingDatesArr = [],
        oldDatesArr = [],
        recurringDatesArr = [],
        completedDatesArr = [];
      for (let i = 0; i < callArr.length; i++) {
        let rowData = await this.callListTypeFilterRow(callArr[i], i, type);
        let res = "";
        switch (type) {
          case "UPCOMING":
            res = rowData.upcomingArr;
            break;
          case "OLD":
            res = rowData.oldArr;
            break;
          case "RECURRING":
            res = rowData.recurringArr;
            break;
          case "COMPLETED":
            res = rowData.completedArr;
            break;
        }
        if (res.length > 0) {
          switch (type) {
            case "UPCOMING":
              upcomingArr.push(...res);
              break;
            case "OLD":
              oldArr.push(...res);
              break;
            case "RECURRING":
              recurringArr.push(...res);
              break;
            case "COMPLETED":
              completedArr.push(...res);
              break;
          }
        }
      }

      switch (type) {
        case "UPCOMING":
          if (upcomingArr.length > 0) {
            for (const row of upcomingArr) {
              let date1 = await moment(row.generatedScheduleDate).format(
                "YYYY-MM-DD"
              );
              if (upcomingDatesArr.includes(date1) === false) {
                upcomingDatesArr.push(date1);
              }
            }
          }
          break;
        case "OLD":
          if (oldArr.length > 0) {
            for (const row of oldArr) {
              let date1 = await moment(row.generatedScheduleDate).format(
                "YYYY-MM-DD"
              );
              if (oldDatesArr.includes(date1) === false) {
                oldDatesArr.push(date1);
              }
            }
          }
          break;
        case "RECURRING":
          if (recurringArr.length > 0) {
            for (const row of recurringArr) {
              let date1 = await moment(row.generatedScheduleDate).format(
                "YYYY-MM-DD"
              );
              if (recurringDatesArr.includes(date1) === false) {
                recurringDatesArr.push(date1);
              }
            }
          }
          break;
        case "COMPLETED":
          if (completedArr.length > 0) {
            for (const row of completedArr) {
              let date1 = await moment(row.generatedScheduleDate).format(
                "YYYY-MM-DD"
              );
              if (completedDatesArr.includes(date1) === false) {
                completedDatesArr.push(date1);
              }
            }
          }
          break;
      }

      let returnObj = {};
      switch (type) {
        case "UPCOMING":
          returnObj = {
            upcomingArr,
            upcomingDatesArr
          };
          break;
        case "OLD":
          returnObj = {
            oldArr,
            oldDatesArr
          };
          break;
        case "RECURRING":
          returnObj = {
            recurringArr,
            recurringDatesArr
          };
          break;
        case "COMPLETED":
          returnObj = {
            completedArr,
            completedDatesArr
          };
          break;
      }
      return returnObj;
    } catch (err) {
      console.log(err);
    }
  }

  /*
   * type: UPCOMING | OLD | RECURRING | COMPLETED
   */
  callListTypeFilterRow(row, loopIndex, type) {
    let upcomingArr = [],
      oldArr = [],
      recurringArr = [],
      completedArr = [];
    let todaysDate = new Date();
    todaysDate = new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth(),
      todaysDate.getDate(),
      0,
      0,
      0
    );
    let todaysDateUptoMinute = new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth(),
      todaysDate.getDate(),
      todaysDate.getHours(),
      todaysDate.getMinutes(),
      0
    );
    let scheduleDate = moment(row.schedule_date); //let scheduleDate = new Date(row.schedule_date);
    //moment('2010-10-20').isSameOrAfter('2010-10-19'); // true
    //scheduleDate.getTime() >= todaysDate.getTime()
    let genDate = "";
    let recurringEndDate = "";
    let scheduleDateToDate = moment(row.schedule_date).toDate();

    try {
      return new Promise(async (resolve, reject) => {
        if (
          (type === "UPCOMING" || type === "OLD") &&
          row.call_status === appConsts.callStatus_ADDED
        ) {
          if (moment(scheduleDate).isSameOrAfter(todaysDate)) {
            // Do Not Repeat
            if (type === "UPCOMING") {
              if (row.recurring_type_id === 1) {
                let genDate = await this.generateDate(row, scheduleDate);
                upcomingArr.push(genDate);
              }
            }

            // Daily
            if (row.recurring_type_id === 2) {
              if (row.recurring_end_date_type_id === 2) {
                recurringEndDate = moment(row.recurring_end_date);
                if (moment(recurringEndDate).isSameOrAfter(todaysDate)) {
                  if (type === "UPCOMING") {
                    let genDate = await this.generateDate(
                      row,
                      todaysDateUptoMinute
                    );
                    upcomingArr.push(genDate);
                  }
                } else {
                  // Old
                  if (type === "OLD") {
                    let genDate = await this.generateDate(row, scheduleDate);
                    oldArr.push(genDate);
                  }
                }
              } else {
                // Forever
                if (type === "UPCOMING") {
                  let genDate = await this.generateDate(
                    row,
                    todaysDateUptoMinute
                  );
                  upcomingArr.push(genDate);
                }
              }
            }

            // Weekly - Recurring
            if (row.recurring_type_id === 3) {
              let isPushWeekly = false;
              if (row.recurring_end_date_type_id === 2) {
                recurringEndDate = moment(row.recurring_end_date);
                if (moment(recurringEndDate).isSameOrAfter(todaysDate)) {
                  isPushWeekly = true;
                } else {
                  // Old
                  if (type === "OLD") {
                    let genDate = await this.generateDate(row, scheduleDate);
                    oldArr.push(genDate);
                  }
                }
              } else {
                // Forever
                isPushWeekly = true;
              }

              if (type === "UPCOMING" && isPushWeekly === true) {
                let startWeekDate = moment(scheduleDate).isSameOrAfter(
                  todaysDate
                )
                  ? scheduleDate
                  : todaysDate;
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
                let weekDaysArr = row.weekly.split(",");
                weekDaysArr = weekDaysArr.map(Number);
                // Loop through week days
                for (
                  let d = 0,
                    startPointer = moment(startWeekDate)
                      .toDate()
                      .getDay();
                  d < 7;
                  d++, startPointer++
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
                      scheduleDateToDate.getHours(),
                      scheduleDateToDate.getMinutes(),
                      0
                    );
                    let genDate = await this.generateDate(row, genDate);
                    upcomingArr.push(genDate);
                  }
                }
              }
            }

            // Monthly
            if (row.recurring_type_id === 4) {
              var isPushMonthly = false;
              if (row.recurring_end_date_type_id === 2) {
                recurringEndDate = moment(row.recurring_end_date);
                if (moment(recurringEndDate).isSameOrAfter(todaysDate)) {
                  isPushMonthly = true;
                } else {
                  // Old
                  if (type === "OLD") {
                    let genDate = await this.generateDate(row, scheduleDate);
                    oldArr.push(genDate);
                  }
                }
              } else {
                // Forever
                isPushMonthly = true;
              }
              console.log("|4|");
            }
            if (type === "UPCOMING" && isPushMonthly === true) {
              let monthlyDate = moment(scheduleDate).isAfter(todaysDate)
                ? scheduleDateToDate
                : moment(scheduleDate)
                    .add(1, "months")
                    .toDate();
              genDate = new Date(
                monthlyDate.getFullYear(),
                monthlyDate.getMonth(),
                monthlyDate.getDate(),
                scheduleDateToDate.getHours(),
                scheduleDateToDate.getMinutes(),
                0
              );
              let genDate = await this.generateDate(row, genDate);
              upcomingArr.push(genDate);
            }
          } else {
            // Old
            if (type === "OLD") {
              let genDate = await this.generateDate(row, scheduleDate);
              oldArr.push(genDate);
            }
          }
        }

        // Recurring
        if (row.recurring_type_id !== 1) {
          let genDate = await this.generateDate(row, scheduleDate);
          recurringArr.push(genDate);
        }

        // Completed
        if (row.call_status === appConsts.callStatus_COMPLETED) {
          let genDate = await this.generateDate(row, scheduleDate);
          completedArr.push(genDate);
        }
        loopIndex++;

        let returnObj = {};
        switch (type) {
          case "UPCOMING":
            returnObj = {
              upcomingArr
            };
            break;
          case "OLD":
            returnObj = {
              oldArr
            };
            break;
          case "RECURRING":
            returnObj = {
              recurringArr
            };
            break;
          case "COMPLETED":
            returnObj = {
              completedArr
            };
            break;
        }
        resolve(returnObj);
        //resolve(upcomingArr);
      });
    } catch (error) {}
  }

  generateDate(row, date) {
    return new Promise((resolve, reject) => {
      let newRow = Object.assign({}, row, {
        generatedScheduleDate: moment(date).format("YYYY-MM-DD HH:mm:ss")
      });
      resolve(newRow);
    });
  }

  waitTime(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}

module.exports = new CallService();
