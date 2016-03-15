var mongoose = require("./mongoose");
var db = mongoose.connection;

var fileSchema = mongoose.Schema({
    file: {
        size: Number,
        path: String,
        filename: String,
        destination: String,
        mimetype: String,
        encoding: String,
        originalname: String,
        fieldname: String
    },
    owner: String,
    uploadedAt: Date
});
var File = mongoose.model('File', fileSchema);
module.exports = File;