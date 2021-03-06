$(document).ready(function (){
    if(window.location.href == 'http://localhost:5000/?valid=false' || window.location.href == 'https://mysterious-woodland-93448.herokuapp.com/?valid=false'){
    $.urlParam = function(name){
	   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	   return results[1] || 0;
    }
    
    console.log($.urlParam('valid'));
    if ($.urlParam('valid') == 'false'){
        $("#invalid").append("Invalid Username or Password")
    }
    }
    
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
        
        if(username.length < 4 ){
            $("#userWarning").empty();
            $("#userWarning").append("Username needs to be more than 8 characters");
            return
        }
        if(password.length < 8){
            $("#passWarning").empty();
            $("#passWarning").append("Password needs to be more than 8 characters");
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
                        $("#userWarning").empty();
                        $("#passWarning").empty();
                        alert("You have successfully created an account! Please login.");
                    }
                }
            }); 
        }
    });
});