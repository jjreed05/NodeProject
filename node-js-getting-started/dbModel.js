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

function getUser(user, callback){
    pool.query('SELECT * FROM users where username = $1::text', [user], function(err, result){
        if (err) {
            callback(null, err)
            return
        }
        if(result.rows.length == 0){
            callback(null, 'User not defined')
            return
        }
        callback(null, result)
    })
}

function getEntry(callback){
    pool.query('SELECT * FROM journals', function(err, result){
        if (err) {
            console.log('Error fetching from pool')
            return err
        }
        callback(null, result)
    })
}

function postEntry(entry, callback){
    var insert = entry.entry
    var title = entry.title
    console.log(insert)
    const values = [title, insert, '1']
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

module.exports = {getUser: getUser, getEntry: getEntry, postEntry: postEntry, deleteEntry: deleteEntry}