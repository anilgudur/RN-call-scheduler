'use strict';
//import { CONFIG } from "../../Config/Environment/EnvironmentConfig";
import { DB_CONFIG } from '../Config/DBConfig';
import { TABLES } from '../constants/index';
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
          console.log("db -> 1. Integrity check passed ...");
          console.log("db -> Opening database ...");
          SQLite.openDatabase(DB_CONFIG.dbName, DB_CONFIG.dbVersion, DB_CONFIG.dbDisplayname, DB_CONFIG.dbSize).then((DB) => {
            this.db = DB;
            console.log("db -> Database OPENED");
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
          console.log("db -> echoTest failed - plugin not functional");
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
      console.log("db -> Database integrity check");
      db.executeSql('SELECT 1 FROM '+ TABLES.TBL_CALL_ADDED +' LIMIT 1').then(() => {
        console.log("db -> Database is ready ... executing query ...");
        resolve(true);
        // db.transaction(this.queryEmployees).then(() => {
        //   console.log("db -> Processing completed")
        // });
      }).catch((error) => {
        console.log("db -> Received error: ", error);
        console.log("db -> Database not yet ready ... populating data");
        db.transaction(this.populateDB).then(() => {
          console.log("db -> Database populated ... executing query ...");
          this.closeDatabase();
          resolve(true);
          // db.transaction(this.queryEmployees).then((result) => {
          //   console.log("db -> Transaction is now finished");
          //   console.log("db -> Processing completed");
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
    console.log("db -> Executing DROP stmts");

    // Drop tables
    DB_CONFIG.tables.forEach((table) => {
      console.log('db -> table: ', table);
      tx.executeSql('DROP TABLE IF EXISTS ' + table.name + ';');
    });

    // CREATE tables
    console.log("db -> Executing CREATE stmts");
    DB_CONFIG.tables.forEach((table) => {
      let columns = [];
      table.columns.forEach((column) => {
        columns.push(column.name + ' ' + column.type);
      });
      let query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ');';
      console.log('db -> query:: ', query);
      tx.executeSql(query).catch((error) => {
        console.log('db -> Error executeSql: ', error);
        //this.errorCB(error);
      });
    });

    console.log("db -> all config SQL done");
  };

  closeDatabase = () => {
    if (this.db) {
      console.log("db -> Closing database ...");
      console.log("db -> Closing DB");
      this.db.close().then((status) => {
        console.log("db -> Database CLOSED");
      }).catch((error) => {
        console.log("db -> closeDatabase error", error);
      });
    } else {
      console.log("db -> Database was not OPENED")
    }
  };

  /**
   * execute query
   */
  query = (query, bindings) => {
    return new Promise((resolve, reject) => {

      bindings = typeof bindings !== 'undefined' ? bindings : [];

      this.db.transaction((transaction) => {

        if (Array.isArray(query)) {
          for (var i = 0; i < query.length; i++) {
            transaction.executeSql(query[i], bindings, (transaction, result) => {
              resolve(result);
            }, (transaction, error) => {
              reject(error);
            });
          }
        } else {
          transaction.executeSql(query, bindings, (transaction, result) => {
            resolve(result);
          }, (transaction, error) => {
            reject(error);
          });
        }

      }).catch(err => {
        reject(err);
      });

    });
  }

  /**
   * fetchAll
   */
  fetchAll = (result) => {
    var output = [];
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

}

module.exports = new DBDefinitionService();