const express = require('express');
const router = express.Router();
const backer = require('../controllers/back');
const os = require('os');
const moment = require('moment');
const mysql = require('../controllers/mysql')
const configs = require('../config/config')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({title: '手动备份工具'});
});


/**
 * 备份日志
 */
router.get('/bak_logs/:date', (req, res, next) => {
    let date = req.params.date;
    let taskId = req.query._id;
    backer.bakLogs({date: date})
        .then(function (data) {
        res.json({
            code: 1, task: taskId, data: data
        })
    }).catch((err) => {
        res.json({code: 0, err: err.message});
    })
})

/**
 * 清理备份数据
 */
router.get('/clear_bak', (req, res, next) => {
    backer.bakLogs({date: '2017-10-10'}).then(function (data) {
        res.json({code: 1, data: data})
    }).catch((err) => {
        res.json({code: 0, err: err.message});
    })
})
module.exports = router;
