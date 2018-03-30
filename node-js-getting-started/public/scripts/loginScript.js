$(document).ready(function (){
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
        
        if(username == verifyUser && password == verifyPass){
            $.ajax({
                url: '/createUser',
                type: "POST",
                data: { username: username, password: password },
                success: function(){
                    $("#user").val("");
                    $("#verifyUser").val("");
                    $("#pass").val("");
                    $("#verifyPass").val("");
                    console.log("success!");
                    alert("You have successfully created an account! Please login.")
                }
            });  
        }
    });
});