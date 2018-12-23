"use strict";
//import { CONFIG } from "../../Config/Environment/EnvironmentConfig";
import { DB_CONFIG } from "../Config/DBConfig";
import { TABLES } from "../constants/index";
import SQLite from "react-native-sqlite-storage";
//SQLite.DEBUG(true);
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
  init = isDbVersionChanged => {
    return new Promise((resolve, reject) => {
      try {
        SQLite.echoTest()
          .then(() => {
            //console.log("db -> 1. Integrity check passed ...");
            //console.log("db -> Opening database ...");
            SQLite.openDatabase(
              DB_CONFIG.dbName,
              DB_CONFIG.dbVersion,
              DB_CONFIG.dbDisplayname,
              DB_CONFIG.dbSize
            )
              .then(DB => {
                this.db = DB;
                //console.log("db -> Database OPENED");
                this.populateDatabase(DB, isDbVersionChanged)
                  .then(res => {
                    resolve(true);
                  })
                  .catch(err => {
                    reject(false);
                  });
              })
              .catch(error => {
                console.log(error);
                resolve(false);
              });
          })
          .catch(error => {
            console.log("db -> echoTest failed - plugin not functional");
            //console.log("echoTest failed - plugin not functional");
            resolve(true);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * @memberof DBDefinitionService
   * Populate Database
   */
  populateDatabase(db, isDbVersionChanged) {
    return new Promise((resolve, reject) => {
      //console.log("db -> Database integrity check");
      db.executeSql("SELECT 1 FROM " + TABLES.TBL_CALL_ADDED + " LIMIT 1")
        .then(() => {
          //console.log("db -> Database is ready ... executing query ...");
          //console.log('::populateDatabase populateDatabase: ', isDbVersionChanged);

          // Start: New logic of handle if column not exist
          if (isDbVersionChanged === true) {
            this.checkAndAddNewColumn()
              .then(res => {
                resolve(true);
              })
              .catch(error => {
                resolve(true);
              });
          } else {
            resolve(true);
          }
          // End: New logic of handle if column not exist

          // db.transaction(this.queryEmployees).then(() => {
          //   console.log("db -> Processing completed")
          // });
        })
        .catch(error => {
          //console.log("db -> Received error: ", error);
          //console.log("db -> Database not yet ready ... populating data");
          db.transaction(this.populateDB).then(() => {
            //console.log("db -> Database populated ... executing query ...");
            this.closeDatabase();
            resolve(true);
            // db.transaction(this.queryEmployees).then((result) => {
            //   console.log("db -> Transaction is now finished");
            //   console.log("db -> Processing completed");
            // });
          });
        });
    });
  }

  /**
   * @memberof DBDefinitionService
   * Populate DB
   */
  populateDB = tx => {
    //console.log("db -> Executing DROP stmts");

    // Drop tables
    // DB_CONFIG.tables.forEach((table) => {
    //   console.log('db -> table: ', table);
    //   tx.executeSql('DROP TABLE IF EXISTS ' + table.name + ';');
    // });

    // CREATE tables
    //console.log("db -> Executing CREATE stmts");
    DB_CONFIG.tables.forEach(table => {
      let columns = [];
      table.columns.forEach(column => {
        columns.push(column.name + " " + column.type);
      });
      let query =
        "CREATE TABLE IF NOT EXISTS " +
        table.name +
        " (" +
        columns.join(",") +
        ");";
      //console.log('db -> query:: ', query);
      tx.executeSql(query).catch(error => {
        console.log("db -> Error executeSql: ", error);
        //this.errorCB(error);
      });
    });

    //console.log("db -> all config SQL done");
  };

  closeDatabase = () => {
    if (this.db) {
      //console.log("db -> Closing database ...");
      //console.log("db -> Closing DB");
      this.db
        .close()
        .then(status => {
          //console.log("db -> Database CLOSED");
        })
        .catch(error => {
          console.log("db -> closeDatabase error", error);
        });
    } else {
      console.log("db -> Database was not OPENED");
    }
  };

  /**
   * execute query
   */
  query = (query, bindings) => {
    return new Promise((resolve, reject) => {
      bindings = typeof bindings !== "undefined" ? bindings : [];

      this.db
        .transaction(transaction => {
          if (Array.isArray(query)) {
            for (var i = 0; i < query.length; i++) {
              transaction.executeSql(
                query[i],
                bindings,
                (transaction, result) => {
                  resolve(result);
                },
                (transaction, error) => {
                  reject(error);
                }
              );
            }
          } else {
            transaction.executeSql(
              query,
              bindings,
              (transaction, result) => {
                resolve(result);
              },
              (transaction, error) => {
                reject(error);
              }
            );
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  /**
   * fetchAll
   */
  fetchAll = result => {
    var output = [];
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  };

  /**
   * Check and add new column
   */
  async checkAndAddNewColumn() {
    //console.log('checkAndAddNewColumn');
    return await new Promise((resolve, reject) => {
      DB_CONFIG.tables.forEach(table => {
        let colCheckQuery =
          "SELECT sql FROM sqlite_master WHERE tbl_name = '" +
          table.name +
          "' AND type = 'table'";
        this.query(colCheckQuery)
          .then(result => {
            let promiseQueryCheck = new Promise((resolve, reject) => {
              //console.log('result::', result);
              // let item = result.rows.item(0);
              // console.log('item:: ', item);

              //console.log("Check table: ", table.name);
              //let qryStr = result.rows._array[0].sql; //var qryStr = "CREATE TABLE privacy (_id integer primary key,HasViewed integer default 0)";
              let qryStr = result.rows.item(0).sql; //var qryStr = "CREATE TABLE privacy (_id integer primary key,HasViewed integer default 0)";
              //console.log('qryStr:: ', qryStr);
              let firstIndex = qryStr.indexOf("(");
              let commaStr = qryStr.substring(
                firstIndex + 1,
                qryStr.length - 1
              );
              //console.log('commaStr::', commaStr);

              let dbColumns = [];
              let colArr = commaStr.split(",");
              colArr.forEach(res => {
                res = res.trim();
                let tempArr = res.split(" ");
                dbColumns.push(tempArr[0]);
              });
              //console.log('dbColumns::', dbColumns);

              // Add Columns
              table.columns.forEach(column => {
                //console.log('column',column);
                let isFound = dbColumns.indexOf(column.name);
                if (isFound === -1) {
                  //console.log("ALTER table: ", table.name);
                  let queryAlter =
                    "ALTER TABLE " +
                    table.name +
                    " ADD COLUMN " +
                    column.name +
                    " " +
                    column.type;
                  this.query(queryAlter)
                    .then(qry => {})
                    .catch(error => {});
                }
              });

              // Drop Columns
              let isFound2 = "";
              //dbColumns.forEach((columnName) => {
              for (let columnName of dbColumns) {
                //console.log('columnName',columnName);
                isFound2 = table.columns.find(function(column) {
                  return column.name === columnName;
                });
                if (isFound2 === undefined) {
                  break;
                }
              }
              //console.log('------------- db |Drop Columns| isFound: ', isFound2);
              // If column deleted from DB_CONFIG.tables then drop the column
              if (isFound2 === undefined) {
                // STEP - 1 -> Create new table
                // CREATE tables
                //console.log("db -> Executing CREATE stmts");
                let columns = [];
                let columnNames = [];
                table.columns.forEach(column => {
                  columns.push(column.name + " " + column.type);
                  columnNames.push(column.name);
                });
                let createNewquery =
                  "CREATE TABLE IF NOT EXISTS " +
                  table.name +
                  "_NEW (" +
                  columns.join(",") +
                  ");";
                //console.log('db -> createNewquery:: ', createNewquery);
                this.query(createNewquery)
                  .then(res => {
                    //console.log('Success: ', res);
                    // STEP - 2 -> Copy data
                    let insertQuery =
                      "INSERT INTO " +
                      table.name +
                      "_NEW SELECT " +
                      columnNames.join(",") +
                      " FROM " +
                      table.name;
                    //console.log('db -> insertQuery:: ', insertQuery);
                    this.query(insertQuery)
                      .then(res => {
                        //console.log('Success: ', res);
                        // STEP - 3 -> Drop old table
                        let dropQuery = "DROP TABLE IF EXISTS " + table.name;
                        //console.log('db -> createNewquery:: ', dropQuery);
                        this.query(dropQuery)
                          .then(res => {
                            //console.log('Success: ', res);
                            // STEP - 4 -> Rename new into old
                            let renameQuery =
                              "ALTER TABLE " +
                              table.name +
                              "_NEW RENAME TO " +
                              table.name;
                            //console.log('db -> createNewquery:: ', renameQuery);
                            this.query(renameQuery)
                              .then(res => {
                                //console.log('Success: ', res);
                              })
                              .catch(err => {
                                console.log("db -> Error renameQuery: ", err);
                              });
                          })
                          .catch(error => {
                            console.log("db -> Error dropQuery: ", error);
                            //this.errorCB(error);
                          });
                      })
                      .catch(error => {
                        console.log("db -> Error insertQuery: ", error);
                        //this.errorCB(error);
                      });
                  })
                  .catch(error => {
                    console.log("db -> Error createNewquery: ", error);
                    //this.errorCB(error);
                  });
              }

              // table.columns.forEach((column) => {
              //   let isFound = dbColumns.indexOf(column.name);
              //   if (isFound === -1) {
              //     //console.log("ALTER table: ", table.name);
              //     let queryAlter = "ALTER TABLE " + table.name + " ADD COLUMN " + column.name + " " + column.type;
              //     this.query(queryAlter).then((qry) => {}).catch((error) => {});
              //   }
              // });
            });

            promiseQueryCheck
              .then(res => resolve(true))
              .catch(err => reject(err));
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
}

module.exports = new DBDefinitionService();
