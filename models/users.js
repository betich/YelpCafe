var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model("User", UserSchema);