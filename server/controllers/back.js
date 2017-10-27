/**
 * Created by zhaojunlike on 10/10/2017.
 */
"use strict";
const BakLogModel = require('../models/BakLog').Model


module.exports.bakLogs = function (where) {
    return BakLogModel.find(where).sort({time: 'desc'});
}
module.exports.clearBakLogs = function (where) {
    return BakLogModel.delete(where);
}

module.exports.Model = BakLogModel;
