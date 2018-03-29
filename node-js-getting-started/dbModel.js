const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:4857@localhost:5432/journaldb'
var ssl = false

// setting the ssl
if(connectionString == process.env.DATABASE_URL){
    ssl = true
}

const pool = new Pool({
    connectionString: connectionString,
    ssl: ssl,
}) 

// checking to see if we have valid login credentials
function getUser(user, callback){
    pool.query('SELECT * FROM users WHERE username = $1::text', [user], function(err, result){
        if (err) {
            callback(null, null, err)
            return
        }
        if(result.rows.length == 0){
            callback(null, null, false)
            return
        }else{
            callback(null, result, true) 
        }
        
    })
}

function getEntry(userID, callback){
    pool.query('SELECT * FROM journals WHERE userid = $1::numeric', [userID], function(err, result){
        if (err) {
            console.log('Error fetching from pool')
            return err
        }
        callback(null, result)
    })
}

function postEntry(entry, userID, callback){
    var insert = entry.entry
    var title = entry.title

    const values = [title, insert, userID]
    pool.query("INSERT INTO journals(title, entry, userid) VALUES($1, $2, $3)", values, function(err, result){
        if (err) {
            console.log("Error inserting into the Database")
            console.log(err)
            callback(err, null)
            return
        }
        callback(null, result)
    })
}

function deleteEntry(entry, callback){
    console.log(entry.item)
    var item = entry.item
    pool.query('DELETE FROM journals WHERE id=$1', [item], function(err, result){
        if (err){
            console.log(err)
            
        }
        callback(null, result)
    })
}

function newUser(username, password, callback){
    console.log("Inserting " + username + " into the database")
    const values = [username, password]
    pool.query("INSERT INTO users(username, userpass) VALUES($1, $2)", values, function(err, result){
        if (err) {
            console.log("Error inserting into the Database")
            console.log(err)
            callback(err, null)
            return
        }
        callback(null, result)
    })    
}

module.exports = {getUser: getUser, getEntry: getEntry, postEntry: postEntry, deleteEntry: deleteEntry, newUser: newUser}