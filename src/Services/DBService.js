'use strict';
//import { DB_CONFIG } from "../Config/DBConfig";
//import SQLite from 'react-native-sqlite-storage';
import DB from "./DBDefinitionService";
//import UtilService from "./UtilService";

/**
 * DB Service
 */
class DBService {

  /**
   * @memberof DBService
   * insertData
   */
  insertData(idata) {

    return new Promise((resolve, reject) => {
      let colname = [];
      let coldata = [];
      let condc = [];
      //cond = typeof cond !== 'undefined' ? cond : [];
      if (idata.cond !== undefined) {
        idata.cond.forEach((c) => {
          if (isNaN(c.data)) {
            condc.push(c.name + "=\"" + c.data + "\"");
          } else {
            condc.push(c.name + "=" + c.data);
          }
        })
      }

      let updatedata = [];
      Object.keys(idata.data).forEach((column) => {
        colname.push(column);
        let str = idata.data[column].toString();
        str = str.replace(/"/g, "\"\"");
        //str = str.replace(/'/g, "\'\'");

        coldata.push(str);
        updatedata.push(column + "=\"" + idata.data[column] + "\"");
      });

      let insertquery = 'INSERT INTO ' + idata.tbname + '(' + colname.join(',') + ") VALUES (\"" + coldata.join("\" , \"") + "\");";
      let updatequery;

      try {
        if (condc.join(' AND ') == '') {
          DB.query(insertquery).then((result) => {
            resolve(true);
          }).catch((error) => {
            reject(error);
          });
        } else {
          updatequery = 'UPDATE ' + idata.tbname + " SET " + updatedata.join(',') + ' WHERE ' + condc.join(' AND ') + ';';
          DB.query(updatequery).then((result) => {
            if (!result.rowsAffected) {
              DB.query(insertquery).then((res) => {
                resolve(true);
              })
              .catch((error) => {
                reject(error);
              });
            }
          }).catch(() => {
          });
        }
      } catch (e) {
        reject(e);
      }
    });

  }

  /*
   * Get data list from table
   */
  getDataList = (data, order, group) => {
    var datalist = [];
    var cond = [];
    var notCond = [];
    var columns = [];

    if (data.cond !== undefined) {
        data.cond.forEach((c) => {
            if (isNaN(c.data)) {
                cond.push(c.name + "='" + c.data + "'");
            } else {
                cond.push(c.name + "=" + c.data);
            }
        });
    }
    // Added != condition
    if (data.notCond !== undefined) {
        data.notCond.forEach((c) => {
            if (isNaN(c.data)) {
                notCond.push(c.name + "!='" + c.data + "'");
            } else {
                notCond.push(c.name + "!=" + c.data);
            }
        });
    }
    data.columns.forEach((c) => {
        columns.push(c);
    })
    var query;

    if (cond.join(' AND ') != "") {
        query = "SELECT " + columns.join(',') + " FROM " + data.tbname + " WHERE " + cond.join(' AND ');
        // != 'not equal to' condition
        if (notCond.join(' AND ') != "") {
            query = query + " AND " + notCond.join(' AND ');
        }
    } else {
        query = "SELECT " + columns.join(',') + " FROM " + data.tbname
        // != 'not equal to' condition
        if (notCond.join(' AND ') != "") {
            query = query + " WHERE " + notCond.join(' AND ');
        }
    }

    if (order != '' && order != undefined) {
        query += " ORDER BY " + order;
    }

    if (group != '' && group != undefined) {
        query += " GROUP BY " + group;
    }

    return DB.query(query).then((result) => {
        return DB.fetchAll(result);
    }).catch((err) => {
        //console.log("err getData(): ", err);
    });
  }

}

module.exports = new DBService();