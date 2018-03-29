const dbModel = require('./dbModel.js')
const bodyParser = require('body-parser')
const session = require('express-session')

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
    var password = req.body.password
    console.log('Requesting login for ' + username)
    dbModel.getUser(username, password, function(err, result){
        if (result == true) {
            req.session.loggedIn = true;
            res.render('pages/journalPage')
        }else {
            req.session.loggedIn = false;
            res.json({success: false});
        }
    })
    
}

function handleLogout(req, res){
    console.log('Received a logout request')
    req.session.loggedIn = false
    return res.render('pages/login')
}

function handleDeletion(req, res){
    console.log("Deleting off the database")
    var item = req.body
    dbModel.deleteEntry(item, function(err, result){
        res.send('success')
    })
}

function verifyLogin(req, res, next){
    if (!req.session.loggedIn){
        return res.status(401).json({success: false});
    }
    return next()
}

module.exports = {handleJournal: handleJournal, handleNewEntry: handleNewEntry, handleLogin: handleLogin, handleLogout: handleLogout, handleDeletion: handleDeletion, verifyLogin: verifyLogin}