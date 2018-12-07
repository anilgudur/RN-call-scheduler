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
  insertData = (idata) => {

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
          updatequery = 'update ' + idata.tbname + " set " + updatedata.join(',') + ' where ' + condc.join(' AND ') + ';';
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

}

module.exports = new DBService();