var express = require('express');
var router = express.Router();
var allFiles = new Array();
var fs = require("fs");

router.get("/", function(req, res, next){
   res.render("files", {allFiles: allFiles, user: req.session.username});
});

router.post('/upload', function(req, res, next){
    console.log("New file received" + req.files[0].originalname);
    allFiles.push({
        file: req.files[0],
        _id: Date.now(),
        owner: req.session.username
    });
    res.redirect("/files");
});

router.get("/delete/:id", function(req, res, next){
    console.log("Deleting file: " + req.params.id);
    
    for(var i = 0; i < allFiles.length; i++){
        
        if(req.params.id == allFiles[i]._id){          
            fs.unlink("./fileUploads/" + allFiles[i].file.filename, function(err){
                if(err){
                    console.log(err);
                }
                console.log("File Deleted");
            });
            allFiles.splice(i, 1);
            break;
        }
    }
    res.redirect("/files");
});

module.exports = router;
