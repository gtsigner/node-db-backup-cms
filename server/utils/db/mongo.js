/**
 * Created by zhaojunlike on 10/10/2017.
 */
const mongoose = require('mongoose');
const dbConf = require('../../config/db').DbConfig
console.log("DbConn:", `mongodb://${dbConf.DB_HOST}/${dbConf.DB_NAME}`);
mongoose.connect(`mongodb://${dbConf.DB_HOST}/${dbConf.DB_NAME}`, {useMongoClient: true});
mongoose.Promise = global.Promise;


mongoose.set('debug', true);

exports.mongoose = mongoose
