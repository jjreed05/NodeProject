const dbModel = require('./dbModel.js')
const bcrypt = require('bcrypt')

function handleJournal(req, res){
    console.log('Requesting a journal entry')
    console.log('The user id is ' + req.session.userID)
    
    dbModel.getEntry(req.session.userID, function(err, result){
        res.send(result.rows)
    })
}

function handleNewEntry(req, res){
    console.log('Inserting new entry')
    console.log(req.body)
    
    dbModel.postEntry(req.body, req.session.userID, function(err, result){
        res.send('success')                 
    })
}

function handleLogin(req, res){
    var username = req.body.username
    var password = req.body.password
    console.log('Requesting login for ' + username)
    dbModel.getUser(username, function(err, result, status){
        if (status == true && bcrypt.compareSync(password, result.rows[0].userpass)) {
            req.session.userID = result.rows[0].id
            req.session.loggedIn = true;
            res.redirect('/journal')
        }else {
            req.session.loggedIn = false;
            res.redirect('/?valid=false')
            //res.json({success: false});
        
        }
    })
    
}

function handleLogout(req, res){
    console.log('Received a logout request')
    req.session.loggedIn = false
    return res.redirect('/')
}

function handleDeletion(req, res){
    console.log("Deleting off the database")
    var item = req.body
    dbModel.deleteEntry(item, function(err, result){
        res.send('success')
    })
}

function verifyLogin(req, res, next){
    console.log('Verifying Login. Is the user logged in? ' + req.session.loggedIn)
    if (!req.session.loggedIn){
        return res.redirect('/');
    }
    return next()
}

function destroyCache(req, res, next){
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
}

function createUser(req, res){
    
    if(req.body.password.length == 0 || req.body.username.length == 0){
        console.log("Credentials cannot be empty")
        return res.send('fail')
    }
    dbModel.getUser(req.body.username, function(err, result, status){
        console.log('Status: ' + status)
        if (status == true){
            console.log('User already exists')
            return res.json({success: false})
        }
        
        let hash = bcrypt.hashSync(req.body.password, 10)
        console.log('Creating User: ' + req.body.username)
        console.log('Hashed Password: ' + hash)
        dbModel.newUser(req.body.username, hash, function(err, result){
            return res.json({success: true})
        })
        
    })
}

module.exports = {handleJournal: handleJournal, handleNewEntry: handleNewEntry, handleLogin: handleLogin, handleLogout: handleLogout, handleDeletion: handleDeletion, verifyLogin: verifyLogin, destroyCache: destroyCache, createUser: createUser}