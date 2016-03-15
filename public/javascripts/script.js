jQuery(document).ready(function($){

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