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
      // #SQLite
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
          "weekly"
          //'is_call_completed'
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

  generateDate(row, date) {
    return new Promise((resolve, reject) => {
      let newRow = Object.assign({}, row, {
        generatedScheduleDate: moment(new Date(date)).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      });
      resolve(newRow);
    });
  }

  callListTypeFilterAW(row, loopIndex) {
    return new Promise((resolve, reject) => {
      //try {
      let upcomingArr = [];
      let oldArr = [];
      let recurringArr = [];
      let completedArr = [];
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
      console.log("row: ", row);
      console.log("row loopIndex: ", loopIndex);
      let scheduleDate = new Date(row.schedule_date);
      let genDate = "";
      let recurringEndDate = "";

      if (scheduleDate.getTime() >= todaysDate.getTime()) {
        console.log("row", row);

        // Do Not Repeat
        if (row.recurring_type_id === 1) {
          // Upcoming
          this.generateDate(row, scheduleDate).then(arr => {
            upcomingArr.push(arr);
          });
          console.log("upcomingArr", upcomingArr);
        }

        // Daily
        if (row.recurring_type_id === 2) {
          if (row.recurring_end_date_type_id === 2) {
            recurringEndDate = new Date(row.recurring_end_date);
            if (recurringEndDate.getTime() >= todaysDate.getTime()) {
              this.generateDate(row, todaysDateUptoMinute).then(arr => {
                upcomingArr.push(arr);
              });
            } else {
              // Old
              this.generateDate(row, scheduleDate).then(arr => {
                oldArr.push(arr);
              });
            }
          } else {
            // Forever
            this.generateDate(row, todaysDateUptoMinute).then(arr => {
              upcomingArr.push(arr);
            });
          }
          console.log("|2|");
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
              this.generateDate(row, scheduleDate).then(arr => {
                oldArr.push(arr);
              });
            }
          } else {
            // Forever
            isPushWeekly = true;
          }

          if (isPushWeekly === true) {
            let startWeekDate =
              scheduleDate.getTime() > todaysDate.getTime()
                ? scheduleDate
                : todaysDate;
            let endWeekDate = moment(new Date(startWeekDate))
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
              let d = 0, startPointer = startWeekDate.getDay();
              d < 7;
              d++, startPointer++
            ) {
              if (startPointer > 6) {
                startPointer = 0;
              }
              //console.log('d', d);
              //console.log('startPointer', startPointer);
              if (weekDaysArr.includes(startPointer)) {
                genDate = moment(new Date(startWeekDate))
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
                this.generateDate(row, genDate).then(arr => {
                  upcomingArr.push(arr);
                });
              }
            }
          }
          console.log("|3|");
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
              this.generateDate(row, scheduleDate).then(arr => {
                oldArr.push(arr);
              });
            }
          } else {
            // Forever
            isPushMonthly = true;
          }
          console.log("|4|");
        }
        if (isPushMonthly === true) {
          let monthlyDate =
            scheduleDate.getTime() > todaysDate.getTime()
              ? scheduleDate
              : moment(new Date(scheduleDate))
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
          this.generateDate(row, genDate).then(arr => {
            upcomingArr.push(arr);
          });
        }
      } else {
        // Old
        this.generateDate(row, scheduleDate).then(arr => {
          oldArr.push(arr);
        });
      }

      /*
      // Recurring
      if (row.recurring_type_id !== 1) {
        this.generateDate(row, scheduleDate).then(arr => {
          recurringArr.push(arr);
        });
      }

      // Completed
      if (row.call_status === appConsts.callStatus_COMPLETED) {
        this.generateDate(row, scheduleDate).then(arr => {
          completedArr.push(arr);
        });
      }
      loopIndex++;
      console.log("loopIndex: ", loopIndex);
*/

      let finalObj = {
        upcomingArr: upcomingArr,
        oldArr: oldArr,
        recurringArr: recurringArr,
        completedArr: completedArr
      };
      resolve(finalObj);
      // } catch (err) {
      //   reject(err);
      // }
    });
  }

  waitTime(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  async callListTypeFilter(callArr, type) {
    try {
      var upcomingArr = [];
      var oldArr = [];
      var recurringArr = [];
      var completedArr = [];
      //console.log('todaysDate:: ', todaysDate);
      //callArr.forEach(row => {
      for (let i = 0; i < callArr.length; i++) {
        let obj = await this.callListTypeFilterAW(callArr[i], i);

        await this.waitTime(500);
        //rowObj.then(obj => {
        console.log("objobj", obj);
        if (obj.upcomingArr.length > 0) {
          upcomingArr.push(...obj.upcomingArr);
        }
        if (obj.oldArr.length > 0) {
          oldArr.push(...obj.oldArr);
        }
        if (obj.recurringArr.length > 0) {
          recurringArr.push(...obj.recurringArr);
        }
        if (obj.completedArr.length > 0) {
          completedArr.push(...obj.completedArr);
        }
        //});
      }

      // Sort
      if (upcomingArr.length > 0) {
        upcomingArr.sort(function(a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return (
            new Date(a.generatedScheduleDate) -
            new Date(b.generatedScheduleDate)
          );
        });
      }

      if (oldArr.length > 0) {
        oldArr.sort(function(a, b) {
          return (
            new Date(b.generatedScheduleDate) -
            new Date(a.generatedScheduleDate)
          );
        });
      }

      if (recurringArr.length > 0) {
        recurringArr.sort(function(a, b) {
          return (
            new Date(b.generatedScheduleDate) -
            new Date(a.generatedScheduleDate)
          );
        });
      }

      if (completedArr.length > 0) {
        completedArr.sort(function(a, b) {
          return (
            new Date(b.generatedScheduleDate) -
            new Date(a.generatedScheduleDate)
          );
        });
      }

      await this.waitTime(2000);

      console.log("upcomingArr", upcomingArr);
      console.log("oldArr", oldArr);
      console.log("recurringArr", recurringArr);
      console.log("completedArr", completedArr);

      var upcomingDatesArr = [];
      var oldDatesArr = [];
      var recurringDatesArr = [];
      var completedDatesArr = [];

      if (upcomingArr.length > 0) {
        //upcomingArr.forEach(row => {
        for (const row of upcomingArr) {
          let date1 = moment(new Date(row.generatedScheduleDate)).format(
            "YYYY-MM-DD"
          );
          //.format("YYYY-MM-DD");
          if (upcomingDatesArr.includes(date1) === false) {
            upcomingDatesArr.push(date1);
          }
        }
      }

      if (oldArr.length > 0) {
        for (const row of oldArr) {
          let date2 = moment(new Date(row.generatedScheduleDate)).format(
            "YYYY-MM-DD"
          );
          //.format("YYYY-MM-DD");
          if (oldDatesArr.includes(date2) === false) {
            oldDatesArr.push(date2);
          }
        }
      }

      if (recurringArr.length > 0) {
        for (const row of recurringArr) {
          let date3 = moment(new Date(row.generatedScheduleDate)).format(
            "YYYY-MM-DD"
          );
          //.format("YYYY-MM-DD");
          if (recurringDatesArr.includes(date3) === false) {
            recurringDatesArr.push(date3);
          }
        }
      }

      if (completedArr.length > 0) {
        for (const row of completedArr) {
          let date4 = moment(new Date(row.generatedScheduleDate)).format(
            "YYYY-MM-DD"
          );
          //.format("YYYY-MM-DD");
          if (completedDatesArr.includes(date4) === false) {
            completedDatesArr.push(date4);
          }
        }
      }

      await this.waitTime(2000);
      return {
        upcomingArr: upcomingArr,
        oldArr: oldArr,
        recurringArr: recurringArr,
        completedArr: completedArr,

        upcomingDatesArr: upcomingDatesArr,
        oldDatesArr: oldDatesArr,
        recurringDatesArr: recurringDatesArr,
        completedDatesArr: completedDatesArr
      };

      // return {
      //   upcomingArr: [
      //     {
      //       color_type_id: 2,
      //       contact_name: "Anil",
      //       generatedScheduleDate: "2018-12-22 03:41:00",
      //       note: "Note - 2",
      //       phone_number: "+919850125677 ",
      //       recurring_end_date: "",
      //       recurring_end_date_type_id: 0,
      //       recurring_type_id: 1,
      //       schedule_date: "2018-12-22 15:41:00",
      //       weekly: "",
      //       _id: 1
      //     },
      //     {
      //       color_type_id: 4,
      //       contact_name: "Anil",
      //       generatedScheduleDate: "2018-12-22 08:53:00",
      //       note: "Note - 4",
      //       phone_number: "+91 90 10 001000",
      //       recurring_end_date: "",
      //       recurring_end_date_type_id: 1,
      //       recurring_type_id: 3,
      //       schedule_date: "2018-12-22 20:53:24",
      //       weekly: "6,2",
      //       _id: 3
      //     },
      //     {
      //       color_type_id: 3,
      //       contact_name: "Anil",
      //       generatedScheduleDate: "2018-12-22 12:00:00",
      //       note: "Note - 3",
      //       phone_number: "+919850125677 ",
      //       recurring_end_date: "",
      //       recurring_end_date_type_id: 1,
      //       recurring_type_id: 2,
      //       schedule_date: "2018-12-22 20:52:40",
      //       weekly: "",
      //       _id: 2
      //     },
      //     {
      //       color_type_id: 4,
      //       contact_name: "Anil",
      //       generatedScheduleDate: "2018-12-25 08:53:00",
      //       note: "Note - 4",
      //       phone_number: "+91 90 10 001000",
      //       recurring_end_date: "",
      //       recurring_end_date_type_id: 1,
      //       recurring_type_id: 3,
      //       schedule_date: "2018-12-22 20:53:24",
      //       weekly: "6,2",
      //       _id: 3
      //     }
      //   ],
      //   oldArr: oldArr,
      //   recurringArr: recurringArr,
      //   completedArr: completedArr,
      //   upcomingDatesArr: ["2018-12-22", "2018-12-25"],
      //   oldDatesArr: oldDatesArr,
      //   recurringDatesArr: recurringDatesArr,
      //   completedDatesArr: completedDatesArr
      // };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new CallService();
