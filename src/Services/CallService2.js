"use strict";
import { TABLES } from "../constants/index";
import DBService from "./DBService";
import moment from "moment";
import { appConsts } from "../constants/index";

class CallService2 {
  /*
   * type: UPCOMING | OLD | RECURRING | COMPLETED
   */
  async callListTypeFilterRowAW(row, loopIndex, type) {
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
    let scheduleDate = new Date(row.schedule_date);
    let genDate = "";
    let recurringEndDate = "";

    try {
      if (scheduleDate.getTime() >= todaysDate.getTime()) {
        console.log("has date");
        // Do Not Repeat
        if (row.recurring_type_id === 1) {
          // Upcoming
          await this.generateDate(row, scheduleDate).then(arr => {
            upcomingArr.push(arr);
          });
          console.log("upcomingArr", upcomingArr);
        }
      } else {
        console.log("No Dates.");
      }

      let obj = {};
      switch (type) {
        case "UPCOMING":
          obj.upcomingArr = upcomingArr;
          break;
        case "OLD":
          obj.oldArr = oldArr;
          break;
        case "RECURRING":
          obj.recurringArr = recurringArr;
          break;
        case "COMPLETED":
          obj.completedArr = completedArr;
          break;
      }
      // console.log("objobj2", obj);
      // let res = await this.resFun(obj);
      // //console.log("resFunresFun", resFun);
      // console.log("resres", res);
      // return res;
      return obj;
    } catch (error) {}
  }

  async callListTypeFilterAW(callArr, type) {
    try {
      let upcomingArr = [];
      let oldArr = [];
      let recurringArr = [];
      let completedArr = [];
      let objName = {
        UPCOMING: "upcomingArr",
        OLD: "oldArr",
        RECURRING: "recurringArr",
        COMPLETED: "completedArr"
      };

      for (let i = 0; i < callArr.length; i++) {
        //upcomingArr.push(callArr[i]);
        let obj = await this.callListTypeFilterRowAW(callArr[i], i, type);
        console.log("objobj1", obj);
        let arr = obj[objName[type]];
        console.log("arrarr", arr);
        if (arr.length > 0) {
          switch (type) {
            case "UPCOMING":
              upcomingArr.push(arr);
              break;
            case "OLD":
              oldArr.push(arr);
              break;
            case "RECURRING":
              recurringArr.push(arr);
              break;
            case "COMPLETED":
              completedArr.push(arr);
              break;
          }
        }
      }
      if (type === "UPCOMING") {
        return { upcomingArr };
      }
      if (type === "OLD") {
        return { oldArr };
      }
      if (type === "RECURRING") {
        return { recurringArr };
      }
      if (type === "COMPLETED") {
        return { completedArr };
      }
    } catch (err) {
      console.log(err);
    }
  }

  resFun(obj) {
    console.log("resFun objobj3", obj);
    return new Promise((resolve, reject) => {
      console.log("resolve");
      resolve(ob);
      // setTimeout(
      //   ob => {
      //     console.log("Set timeout");
      //     resolve(ob);
      //   },
      //   1500,
      //   obj
      // );
    });
  }

  generateDate(row, date) {
    return new Promise((resolve, reject) => {
      let newRow = Object.assign({}, row, {
        generatedScheduleDate: moment(new Date(date)).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      });
      console.log("generateDate", newRow);
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

module.exports = new CallService2();
