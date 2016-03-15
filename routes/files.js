var express = require('express');
var router = express.Router();
var fs = require("fs");
var directoryPath = require("../additional/directory-path");
var db = require("../additional/mongoose").connection;
var File = require("../additional/File");

router.get("/", function(req, res, next){
    console.log("Getting files");
    
    File.find({}, {}, function(err, files){
        console.log("The database contains " + files.length + " file document/s");
        res.render("files", {allFiles: files, user: req.session.username});
    });
});

router.post('/upload', function(req, res, next){
    if(req.files[0] != undefined){
        var newFile = new File({
            file: req.files[0],
            owner: req.session.username,
            uploadedAt : new Date()
        });
                
        console.log("New file created in database - " + newFile);
        
        newFile.save(function (err, newUser) {
            if (err){
                console.log("Could not save file in database - " + err);
            } else {
                console.log("New user saved in mongoDB database - " + newFile);
            }
            res.redirect("/files");
        });
    } else {
        res.redirect("/files");
    }
});

router.get("/delete/:id", function(req, res, next){
    var ObjectId = require('mongodb').ObjectID;
    
    File.findOne({"_id" : ObjectId(req.params.id)}, function(err, files){
        if(err){
            console.log("Cannot find file to delete - " + err);
        } else {
            console.log("Successfully found file to delete - " + files.file.filename);
            files.remove();
            res.redirect("/files");
            
            fs.unlink(directoryPath +  files.file.filename, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("File Deleted");
                }
            });
        }
    });
});

module.exports = router;
