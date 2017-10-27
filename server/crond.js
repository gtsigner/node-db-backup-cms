const schedule = require('node-schedule');
const mysql = require('./controllers/mysql');
const backer = require('./controllers/back');
const moment = require('moment');
const configs = require('./config/config')
const cronParser = require('cron-parser');
const uuidGenV4= require('uuid/v4');


let backTask = [], Jobs = [];

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

function initTasks() {
    mysql.getAllTask().then((data) => {
        backTask = data
    }).catch((err) => {
        console.log(err)
    })
}
/*Init Task 每分钟进行一次获取Task,每分钟*/
const initTask = schedule.scheduleJob('30 */1 * * * *', function () {
    console.error('获取任务时间,获取一次任务');
    initTasks();
});
initTasks();

/**
 * 创建Task工作
 */
function createJobs() {
    Jobs.forEach((job) => {
        job.cancel();
    })
    Jobs = [];
    backTask.forEach((item) => {
        console.log(item.run_time);
        let time = item.run_time
        const newJob = schedule.scheduleJob(`${time.s} ${time.m} ${time.H} ${time.D} ${time.M} ${time.Y}`, function () {
            backupTask(item);
        });
        Jobs.push(newJob);
    });

}

function backupTask(item) {
    let filePrefix = moment().format('YYYY.MM.DD-') + uuidGenV4();
    let fileName = `${filePrefix}-${item.db_config.db_host}@${item.db_config.db_name}.sql`;
    mysql.backupTaskTables(item, {}, configs.backupPath + fileName).then((file) => {
        console.log(fileName);
        backer.Model.create({
            title: "手动备份",
            author: "Node Tools",
            file: fileName,
            time: new Date().getTime() / 1000,
            date: moment().format('YYYY-MM-DD'),
            task: item
        }).then((ret) => {
            console.log("写入日志成功");
        }).catch((err) => {
            console.log({title: err.message});
        })
    })
}

/**
 * 判断是否应该进行一次备份了
 * @param task
 */
function checkNeedAction(task) {
    let time = task.run_time;
    let timeStr = `${time.s} ${time.m} ${time.H} ${time.D} ${time.M} ${time.Y}`;
    //timeStr = "*/3 * * * * *";
    let interval = cronParser.parseExpression(timeStr);
    let next = interval.next().getTime();
    /*如果上次的已经备份过了，就需要交替新的启动时间*/
    console.log("Next:", next);
    if (task.last_backup_time < next) {
        task.next_backup_time = next
    }
}

/*5秒进行一次调度*/
const j = schedule.scheduleJob('*/5 * * * * *', function () {
    backTask.forEach((item) => {
        let nowTime = new Date().getTime();
        console.log(`Now:${nowTime},Last:${item.last_backup_time},Next:${item.next_backup_time}`);
        if (item.next_backup_time && item.next_backup_time < nowTime) {
            console.log("进行一次备份任务");
            backupTask(item);
            item.last_backup_time = nowTime;
            /*完成后，进行保存防止程序中断不能恢复状态*/
        }
        //同步check
        checkNeedAction(item);
        item.save().then((ret) => {
            console.log("更新Task....");
        }).catch((err) => {
            console.log(err);
        })
    })
});

module.exports.run = function () {
    console.error("自动任务已启动");
}
