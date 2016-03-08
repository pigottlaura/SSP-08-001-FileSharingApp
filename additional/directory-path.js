var fs = require("fs");

var pathName = process.env.DIRECTORY_PATH || './fileUploads/';

fs.exists(pathName, function(exists) {
    console.log(exists);
    if (exists == false) {
        console.log("The " + pathName + " directory does not already exist");
        fs.mkdir(pathName, function(err) {
            /*
            if(err){
                // This error appears to be thrown each time a new folder is created,
                // as once it is created then it does exist, so it now say's that it couldn't
                // create it as it already exists (even though it did just create it)
                console.log("Could not create the " + pathName + " directory due to: " + err);
                throw err;
            } else {
                console.log("New directory " + pathName + " created");
            }
            */
            console.log("New directory " + pathName + " created");        
        });
    } else {
        console.log("The " + pathName + " directory already exists");
    }
});


module.exports = pathName;