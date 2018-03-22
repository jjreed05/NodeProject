const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgresql://nodeuser:2319@localhost:5432/journaldb'
const pool = new Pool({
    connectionString: connectionString,
    ssl: true,
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

function getEntry(req, res, next){
    /*console.log('Getting Credentials')
    pool.connect(function (err, client, done){
        if (err) {
            return console.log("Error fetching from pool")
        }
        console.log('Connected to the Database')
        client.query('SELECT * FROM journals', function(err, result){
            done()
            if (err){
                return console.error('error running the query', err)
            }
            res.send(JSON.stringify(result.rows[0].entry))
        })
    })
    pool.end()*/
    pool.query('SELECT * FROM journals', function(err, result){
        if (err) {
            return console.log('Error fetching from pool')
        }
        res.send(JSON.stringify(result.rows[0].entry))
    })
}

module.exports = {getUser: getUser, getEntry: getEntry}