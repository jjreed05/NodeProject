$(document).ready(function (){
    $("#signUp").click(function(){
        var username = document.getElementById('user').value;
        var password = document.getElementById('pass').value;
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
    });
});