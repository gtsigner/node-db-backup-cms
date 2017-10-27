const express = require('express');
const router = express.Router();
const backer = require('../controllers/back');
const os = require('os');
const moment = require('moment');
const mysql = require('../controllers/mysql')


/**
 * 获取tables的表结构
 */
router.get('/all/:id', (req, res, next) => {
    try {
        let id = req.params.id;
        mysql.getAllTables().then((data) => {
            res.json({code: 1, data: data});
        }).catch((err) => {
            res.json({title: err.message});
        })
    } catch (ex) {
        res.json({code: 0, msg: ex.message});
    }
});

/**
 * 获取指定数据库表结构
 */
router.post('/db', (req, res, next) => {
    try {
        let task = req.body.task;
        mysql.getTaskTables(task).then((data) => {
            res.json({code: 1, data: data});
        }).catch((err) => {
            res.json({code: 0, msg: err.message});
        })
    } catch (ex) {
        res.json({code: 0, msg: ex.message});
    }
});

module.exports = router;
