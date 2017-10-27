const db = require('../utils/db/mongo').mongoose

//Schema
const DriverSchema = db.Schema({

});

//Model
const Driver = db.model('Driver', DriverSchema);

module.exports.Model = Driver
