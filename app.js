const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./server/routes/index');
const users = require('./server/routes/users');
const portal = require('./server/routes/portal');
const table = require('./server/routes/table');
const task = require('./server/routes/task');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//静态资源
app.use(express.static('dist'));
app.use(express.static('backup'));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Request-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Token");
    res.header("Access-Control-Request-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", 'NodeJs')
    next();
});

app.use('/api', index);
app.use('/api/users', users);
app.use('/api/portal', portal);
app.use('/api/table', table);
app.use('/api/task', task);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({code: 500, msg: err.message});
});

module.exports = app;
