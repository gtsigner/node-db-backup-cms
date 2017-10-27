const db = require('../utils/db/mongo').mongoose

//Schema
const UserSchema = db.Schema({
    title: String,
    author: String,
    time: Number,
    file: String,
    date: Date,
    mark: [{body: String, date: Date}]
});

//Model
const User = db.model('User', UserSchema);

exports.Model = User
