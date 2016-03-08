var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.username == null){
        res.render('index', { title: 'Express' });
    } else {
        res.redirect("/files");
    }
});

router.post("/", function(req, res, next){
    req.session.username = req.body.username;
    res.redirect("/files");
});

router.get("/fileUploads/:filename", function(req, res, next){
    console.log("User is downloading file");
    res.download("./fileUploads/" + req.params.filename);
});

router.get("/logout", function(req, res, next){
    req.session.destroy(function(err){
        res.redirect("/");
    });
});

module.exports = router;
