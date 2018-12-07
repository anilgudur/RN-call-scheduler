import React from "react";
import { TABLES } from '../constants/index';

/**
 * DB CONFIG
 */
export const DB_CONFIG = {
    dbName: 'CallScheduler.db',
    dbVersion: '0.1',
    dbDisplayname: 'SQLite Test Database',
    dbSize: 200000,
    tables: [
      {
        name: TABLES.TBL_CALL_ADDED,
        columns: [
            {name: '_id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT'},
            {name: 'contact_name', type: 'VARCHAR(110)'},
            {name: 'phone_number', type: 'VARCHAR(20)'},
            {name: 'schedule_date', type: 'DATETIME'},
            {name: 'color_type_id', type: 'TINYINT(3)'},
            {name: 'note', type: 'VARCHAR(255)'},
            {name: 'recurring_type_id', type: 'TINYINT(3)'},
            {name: 'recurring_end_date_type_id', type: 'TINYINT(3)'},
            {name: 'recurring_end_date', type: 'DATE'},
            {name: 'weekly', type: 'VARCHAR(14)'},
            {name: 'is_call_completed', type: 'TINYINT(3) DEFAULT 0'}
        ]
      },
    ]
};
