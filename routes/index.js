var express = require('express');
var router = express.Router();
var fs = require("fs");

var allFiles = new Array();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/files", function(req, res, next){
   res.render("files", {allFiles: allFiles});
});

router.post('/upload', function(req, res, next){
    console.log("New file received" + req.files[0].originalname);
    allFiles.push({
        file: req.files[0],
        _id: Date.now()
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
        }
    }
    res.redirect("/files");
});

module.exports = router;
