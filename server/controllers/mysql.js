/**
 * Created by zhaojunlike on 10/10/2017.
 */
const config = require('../config/db').Mysql;
//const mysqlDump = require('mysqldump');//非常消耗资源
const mysqlDump = require('node-mysql-dump');//流
const mysqlConnect = require('mysql');
const TaskModel = require('../models/Task').Model


function getAllTables() {
    return new Promise((resolve, reject) => {
        mysql.query("SHOW TABLES;", function (err, data) {
            if (err) {
                reject(err)
            } else if (data.length > 0) {
                let ret = [];
                let colName = Object.getOwnPropertyNames(data[0]).toString();
                data.forEach((it) => {
                    ret.push(it[colName]);
                });
                resolve(ret);
            } else {
                resolve([]);
            }
        });
    })
}
function getTablesFromConnection(connect) {
    return new Promise((resolve, reject) => {
        connect.query("SHOW TABLES;", function (err, data) {
            if (err) {
                reject(err)
            } else if (data.length > 0) {
                let ret = [];
                let colName = Object.getOwnPropertyNames(data[0]).toString();
                data.forEach((it) => {
                    ret.push(it[colName]);
                });
                resolve(ret);
            } else {
                resolve([]);
            }
        });
    })
}

/**
 *
 * @param tables
 * @param where
 * @param filename
 * @returns {Promise}
 */
function backupTables(tables, where, filename) {
    return new Promise((resolve, reject) => {
        mysqlDump({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PWD,
            database: config.DB_NAME,
            tables: tables, // only these tables
            //@todo where: {'players': 'id < 1000'}, // Only test players with id < 1000
            //@todo ifNotExist:true, // Create table if not exist
            extendedInsert: true, // use one insert for many rows
            addDropTable: true,// add "DROP TABLE IF EXISTS" before "CREATE TABLE"
            addLocks: true,// add lock before inserting data
            disableKeys: true,//adds /*!40000 ALTER TABLE table DISABLE KEYS */; before insert
            dest: filename // destination file
        }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(filename);
            }
        })
    });
}

module.exports.getAllTables = getAllTables;
module.exports.backupTables = backupTables;


function getTaskTables(task) {
    const connection = mysqlConnect.createConnection({
        host: task.db_config.db_host,
        port: task.db_config.db_port,
        user: task.db_config.db_user,
        password: task.db_config.db_pwd,
        database: task.db_config.db_name
    });
    connection.connect();
    return new Promise((resolve, reject) => {
        getTablesFromConnection(connection).then((tables) => {
            //关闭链接
            resolve(tables);
            connection.end();
        }).catch((err) => {
            reject(err);
            //关闭链接
            connection.end();
        })
    });
}


module.exports.getTaskTables = getTaskTables;
module.exports.getAllTask = function () {
    return new Promise((resolve, reject) => {
        TaskModel.find({status: 1}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
};


module.exports.backupTaskTables = function (task, where, filename) {
    return new Promise((resolve, reject) => {
        mysqlDump({
            host: task.db_config.db_host,
            user: task.db_config.db_user,
            password: task.db_config.db_pwd,
            database: task.db_config.db_name,
            tables: task.tables, // only these tables
            extendedInsert: true, // use one insert for many rows
            addDropTable: true,// add "DROP TABLE IF EXISTS" before "CREATE TABLE"
            addLocks: true,// add lock before inserting data
            disableKeys: true,//adds /*!40000 ALTER TABLE table DISABLE KEYS */; before insert
            dest: filename // destination file
        }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(filename);
            }
        })
    });
}
