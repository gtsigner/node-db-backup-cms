//const process = require('process');
exports.DbConfig = {
    DB_HOST: process.env.MONGO_HOST ? process.env.MONGO_HOST : '192.168.197.128',
    DB_PORT: '27017',
    DB_NAME: 'backer'
};
// exports.Mysql = {
//     DB_HOST: '127.0.0.1',
//     DB_PORT: '3306',
//     DB_USER: 'root',
//     DB_PWD: 'zhaojun',
//     //DB_NAME: 'package_v1'
//     DB_NAME: 'xc_1'
// }
