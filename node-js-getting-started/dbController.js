const dbModel = require('./dbModel.js')
const bodyParser = require('body-parser')

function handleJournal(req, res){
    console.log('Requesting a journal entry')
    
    dbModel.getEntry(function(err, result){
        res.send(result.rows)
    })
}

function handleNewEntry(req, res){
    console.log('Inserting new entry')
    console.log(req.body)
    
    dbModel.postEntry(req.body, function(err, result){
        res.send('success')                 
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

function handleDeletion(req, res){
    console.log("Deleting off the database")
    var item = req.body
    dbModel.deleteEntry(item, function(err, result){
        res.send('success')
    })
}

module.exports = {handleJournal: handleJournal, handleNewEntry: handleNewEntry, handleLogin: handleLogin, handleDeletion: handleDeletion}