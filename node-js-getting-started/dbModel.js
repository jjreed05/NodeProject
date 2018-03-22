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

function getUser(req, res, next){
    console.log('Getting Credentials')
    /*pool.connect(function (err, client, done){
        if (err) {
            return console.log("Error fetching from pool")
        }
        console.log('Connected to the Database')
        client.query('SELECT * FROM users WHERE userName = $1', [req.body.username], function(err, result){
            done()
            if (err){
                return console.error('error running the query', err)
            }
            res.render('pages/journalPage')
        })
    })
    pool.end()*/
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