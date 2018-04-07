$(document).ready(function (){
    $.urlParam = function(name){
	   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	   return results[1] || 0;
    }
    
    /*console.log($.urlParam('valid'));
    if ($.urlParam('valid') == 'false'){
        $("#invalid").append("Invalid Username or Password")
    }*/
    
    $("#signUp").click(function(){
        var username = document.getElementById('user').value;
        var password = document.getElementById('pass').value;
        var verifyUser = document.getElementById('verifyUser').value;
        var verifyPass = document.getElementById('verifyPass').value;
        
        if(username != verifyUser){
            $("#userWarning").empty();
            $("#userWarning").append("Users do not match");
        }
        if(password != verifyPass){
            $("#passWarning").empty();
            $("#passWarning").append("Passwords do not match");
        }
        
        if(username == 0){
            $("#userWarning").empty();
            $("#userWarning").append("Username cannot be empty");
            return
        }
        if(password.length == 0){
            $("#passWarning").empty();
            $("#passWarning").append("Passwords cannot be empty");
            return
        }
        
        if(username == verifyUser && password == verifyPass){
            $.ajax({
                url: '/createUser',
                type: "POST",
                data: { username: username, password: password },
                success: function(data){
                    console.log(data.success)
                    if(data.success == false){
                        $("#userWarning").empty();
                        $("#userWarning").append("Username is taken");
                        return;
                    }else{
                        $("#user").val("");
                        $("#verifyUser").val("");
                        $("#pass").val("");
                        $("#verifyPass").val("");
                        console.log("success!");
                        alert("You have successfully created an account! Please login.");
                    }
                }
            }); 
        }
    });
});