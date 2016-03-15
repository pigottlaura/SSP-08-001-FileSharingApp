var express = require('express');
var router = express.Router();
var fs = require("fs");
var directoryPath = require("../additional/directory-path");

router.get("/", function(req, res, next){
    console.log("Getting files");
    var db = req.db;
    var filecollection = db.get("filecollection");
    filecollection.find({}, {}, function(err, docs){
        console.log("filecollection contains " + docs.length + "document/s");
        res.render("files", {allFiles: docs, user: req.session.username});
    });
});

router.post('/upload', function(req, res, next){
    if(req.files[0] != undefined){
        var db = req.db;
        var filecollection = db.get("filecollection");
        filecollection.insert({
            "file": req.files[0],
            "owner": req.session.username,
            "uploadedAt" : new Date()
        }, function (err, doc){
            if(err){
                console.log("File could not be stored to the database - " + err);
            } else{
                console.log("File successfully stored in the database");
            }
            res.redirect("/files");
        });
    } else {
        res.redirect("/files");
    }
});

router.get("/delete/:id", function(req, res, next){
    var db = req.db;
    var filecollection = db.get("filecollection");
    var ObjectId = require('mongodb').ObjectID;
    filecollection.findOne({"_id" : ObjectId(req.params.id)}, function(err, docs){
        if(err){
            console.log("Cannot find file to delete - " + err);
        } else {
            console.log("Successfully found file to delete - " + docs.file.filename);
            
            fs.unlink(directoryPath +  docs.file.filename, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("File Deleted");
                }
            });
        }
    });
    filecollection.remove({"_id" : ObjectId(req.params.id)});
    res.redirect("/files");
});

module.exports = router;
