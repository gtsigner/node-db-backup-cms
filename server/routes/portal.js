var express = require('express');
var router = express.Router();

/**
 * 登录
 */
router.post('/login', function (req, res, next) {
    let user = req.body.user;
    if (user.username === 'admin' && user.password === 'aa112233') {
        res.json({
            code: 1,
            msg: 'success',
            data: user
        })
    } else {
        res.json({code: 0, msg: '用户名或者密码错误'})
    }

});

module.exports = router;
