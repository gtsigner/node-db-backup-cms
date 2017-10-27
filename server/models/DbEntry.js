const db = require('../utils/db/mongo').mongoose

//Schema
const DbEntrySchema = db.Schema({
    db_config: {
        db_host: String,
        db_port: String,
        db_user: String,
        db_pwd: String,
        db_driver: String,
        db_name: String,
    },
    //Crond格式
    run_time: String,//*分 *时 *天 *月 *年
    //Task
    mark: [{body: String, date: Date}],
    status: Number,//成bai状态
});

let Model = db.model('DbEntry', DbEntrySchema);


Model.create({
    db_config: {
        db_driver: 'mysql',
        db_host: '127.0.0.1',
        db_port: '3306',
        db_user: 'root',
        db_pwd: 'root',
        db_name: 'package_v1'
    }
});

Model.create({
    db_config: {
        db_driver: 'mysql',
        db_host: '127.0.0.1',
        db_port: '3306',
        db_user: 'root',
        db_pwd: 'root',
        db_name: 'package_v2'
    }
});

//Model
module.exports.Model = Model
