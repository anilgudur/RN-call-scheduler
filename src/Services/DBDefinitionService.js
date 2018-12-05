'use strict';
//import { CONFIG } from "../../Config/Environment/EnvironmentConfig";
import { DB_CONFIG } from '../Config/DBConfig';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

//import appService from "./AppService";

/**
 * DB Definition Service
 */
class DBDefinitionService {

  constructor() {
    this.db;
  }

  /**
   * Initialize DB
   */
  init = (isDbVersionChanged) => {
    return new Promise((resolve, reject) => {
      try {
        SQLite.echoTest().then(() => {
          console.log("1. Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(DB_CONFIG.dbName, DB_CONFIG.dbVersion, DB_CONFIG.dbDisplayname, DB_CONFIG.dbSize).then((DB) => {
            this.db = DB;
            console.log("Database OPENED");
            this.populateDatabase(DB).then(res => {
              resolve(true);
            }).catch(err => {
              reject(false);
            });
          }).catch((error) => {
            console.log(error);
            resolve(false);
          });
        }).catch(error => {
          console.log("echoTest failed - plugin not functional");
          //console.log("echoTest failed - plugin not functional");
          resolve(true);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @memberof DBDefinitionService
   * Populate Database
   */
  populateDatabase(db) {
    return new Promise((resolve, reject) => {
      console.log("Database integrity check");
      db.executeSql('SELECT 1 FROM tbl_call_added LIMIT 1').then(() => {
        console.log("Database is ready ... executing query ...");
        resolve(true);
        // db.transaction(this.queryEmployees).then(() => {
        //   console.log("Processing completed")
        // });
      }).catch((error) =>{
        console.log("Received error: ", error);
        console.log("Database not yet ready ... populating data");
        db.transaction(this.populateDB).then(() =>{
          console.log("Database populated ... executing query ...");
          this.closeDatabase();
          resolve(true);
          // db.transaction(this.queryEmployees).then((result) => {
          //   console.log("Transaction is now finished");
          //   console.log("Processing completed");
          // });
        });
      });
    });
  };

  /**
   * @memberof DBDefinitionService
   * Populate DB
   */
  populateDB = (tx) => {
    console.log("Executing DROP stmts");

    // Drop tables
    DB_CONFIG.tables.forEach((table) => {
      console.log('table: ', table);
      tx.executeSql('DROP TABLE IF EXISTS '+ table.name +';');
    });

    // CREATE tables
    console.log("Executing CREATE stmts");
    DB_CONFIG.tables.forEach((table) => {
      let columns = [];
      table.columns.forEach((column) => {
          columns.push(column.name + ' ' + column.type);
      });
      let query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ');';
      console.log('query:: ', query);
      tx.executeSql(query).catch((error) => {
        console.log('Error executeSql: ', error);
        //this.errorCB(error);
      });
    });

    console.log("all config SQL done");
  };

  closeDatabase = () => {
    if (this.db) {
      console.log("Closing database ...");
      console.log("Closing DB");
      this.db.close().then((status) => {
        console.log("Database CLOSED");
      }).catch((error) => {
        console.log("closeDatabase error", error);
      });
    } else {
      console.log("Database was not OPENED")
    }
  };


}

module.exports = new DBDefinitionService();