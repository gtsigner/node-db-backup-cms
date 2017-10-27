const db = require('../utils/db/mongo').mongoose

//Schema
const TaskSchema = db.Schema({
    title: String,
    user: {
        username: String,
        login_ip: String,
    },
    db_config: {
        db_host: String,
        db_port: String,
        db_user: String,
        db_pwd: String,
        db_driver: String,
        db_name: String,
    },
    tables: Array,
    save_path: String,
    //*秒 *分 *时 *天 *月 *年
    run_time: {
        s: String, m: String, H: String, D: String, M: String, Y: String
    },
    last_backup_time: Number,
    next_backup_time: Number,
    //Task
    mark: [{body: String, date: Date}],
    success: Number,//备份成功次数
    status: Number,//0:关闭,1:开启

});

//Model
const Task = db.model('Task', TaskSchema);

module.exports.Model = Task
