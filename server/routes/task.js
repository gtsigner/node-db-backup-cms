const express = require('express');
const router = express.Router();
const backer = require('../controllers/back');
const os = require('os');
const moment = require('moment');
const mysql = require('../controllers/mysql')
const TaskModel = require('../models/Task').Model;

/**
 * 添加任务
 */
router.post('/push', (req, res, next) => {
    let task = req.body.task;
    TaskModel.create(task).then((data) => {
        res.json({code: 1, msg: '添加任务成功', data: data});
    }).catch((err) => {
        res.json({code: 0, msg: err.message});
    })
});

/**
 * 获取全部任务
 */
router.get('/tasks', (req, res, next) => {
    TaskModel.find({}).then((data) => {
        res.json({code: 1, msg: '获取任务列表成功', data: data});
    }).catch((err) => {
        res.json({code: 0, msg: err.message});
    })
})

/**
 * 删除指定任务
 * @param Ids array
 */
router.delete('/del', (req, res, next) => {
    let ids = req.query.ids;
    TaskModel.remove({_id: {$in: ids}}).then((data) => {
        res.json({code: 1, msg: '删除任务成功', ids: ids, data: data});
    }).catch((err) => {
        res.json({code: 0, msg: err.message});
    })
})
/**
 * 查看任务执行日志
 * @param Ids array
 */
router.get('/logs/:date', (req, res, next) => {
    try {
        let date = req.params.date;
        res.json({
            code: 1, msg: 'Logs List', data: {
                date: date
            }
        });
    } catch (ex) {
        res.json({code: 0, msg: ex.message});
    }
})

module.exports = router;
