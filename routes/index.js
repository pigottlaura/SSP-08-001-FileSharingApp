var express = require('express');
var router = express.Router();
var directoryPath = require("../additional/directory-path");

router.get('/', function(req, res, next) {
    if(req.session.username == null){
        res.render('index', { title: 'Express' });
    } else {
        res.redirect("/files");
    }
});

router.post("/", function(req, res, next){
    req.session.username = req.body.username;
    console.log("User created - redirecting to files");
    res.redirect("/files");
});

router.get("/fileUploads/:filename", function(req, res, next){
    console.log("User is downloading the " + req.params.filename + " file");
    res.download(directoryPath + req.params.filename);
});

router.get("/logout", function(req, res, next){
    req.session.destroy(function(err){
        res.redirect("/");
    });
});

module.exports = router;
