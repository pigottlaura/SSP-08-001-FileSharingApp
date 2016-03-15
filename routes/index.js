var express = require('express');
var router = express.Router();
var directoryPath = require("../additional/directory-path");
var db = require("../additional/mongoose").connection;
var User = require("../additional/User");

router.get('/', function(req, res, next) {
    if(req.session.username == null){
        res.render('index', { title: 'Express' });
    } else {
        User.find(function (err, users) {
            if (err){
                console.log("Could not find users - " + err);
            } else {
                console.log(users);
            }
        })
        res.redirect("/files");
    }
});

router.post("/login", function(req, res, next){
    req.session.username = req.body.username;
    User.findOne({username: req.session.username}, {}, function (err, users) {
        if (err){
            console.log("Could not find users - " + err);
            res.send(err);
        } else {
            if(users == null){
                console.log("This is a new user - " + req.body.username);
            
                var newUser = new User({ username: req.body.username });
                
                console.log("New user created - " + newUser);
                
                newUser.save(function (err, newUser) {
                    if (err){
                        console.log("Could not save user in database - " + err);
                    } else {
                        console.log("New user saved in mongoDB database - " + newUser);
                    }
                    res.redirect("/files");
                });
            } else {
                console.log("This is an existing user - " + users.username);
                res.redirect("/files");
            }
        }
    })
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
