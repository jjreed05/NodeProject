const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgresql://nodeuser:2319@localhost:5432/journaldb'
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
            return console.log('Error fetching from pool')
        }
        callback(null, result)
    })
}

module.exports = {getUser: getUser, getEntry: getEntry}