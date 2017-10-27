const db = require('../utils/db/mongo').mongoose

//Schema
const BakLogSchema = db.Schema({
    title: String,//标记
    author: String,//作者
    time: Number,//时间
    file: String,//备份文件名称
    date: Date,//备份日期
    task: Object,//表数据JSON
    mark: String
});

//Model
const BakLog = db.model('BakLog', BakLogSchema);

module.exports.Model = BakLog
