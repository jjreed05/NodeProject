const dbModel = require('./dbModel.js')
const bodyParser = require('body-parser')

function handleJournal(req, res){
    console.log('Requesting a journal entry')
    
    dbModel.getEntry(function(err, result){
        console.log('Journal Entry: ' + result)
        res.send(JSON.stringify(result.rows[0].entry))
    })
}

function handleLogin(req, res){
    var username = req.body.username
    console.log('Requesting login for ' + username)
    dbModel.getUser(username, function(err, result){
        if(err){
            return console.log("Error obtaining user")
        }
        if (result != 'User not defined'){
            console.log(JSON.stringify(result.rows[0].username))
            res.send(JSON.stringify(result.rows[0].username))  
        }else{
            res.render('pages/login')
            console.log('User does not exist!')
        }
    })
}

module.exports = {handleJournal: handleJournal, handleLogin: handleLogin}