var mongoose = require('mongoose');

var connectionString = process.env.CUSTOMCONNSTR_mongoDB || "localhost:27017/fileSharingApp";
mongoose.connect(connectionString);
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected");
});

module.exports = mongoose;