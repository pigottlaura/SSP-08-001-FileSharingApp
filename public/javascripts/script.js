jQuery(document).ready(function($){

	$("#login").submit(function(){
        var allowSubmit = false;
        if($(this).children("input[type='text']").val() != ""){
            allowSubmit = true;
            console.log("Username included - attempting to log in");
        } else {
            console.log("No username included - not allowed to log in");
        }
        return allowSubmit;
    });
    
    $("#uploadFile").submit(function(){
        var allowSubmit = false;
        if($(this).children("input[type='file']").val() != ""){
            allowSubmit = true;
            console.log("File included - allowed to submit");
        } else {
            console.log("No file included - not allowed to submit");
        }
        return allowSubmit;
    });
});