var mongoose = require("./mongoose");
var db = mongoose.connection;

var userSchema = mongoose.Schema({
    username: String
});
var User = mongoose.model('User', userSchema);
module.exports = User;