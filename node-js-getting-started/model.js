//const { Client } = require('pg')
const pg = require('pg')
const config = {
    database: 'journaldb',
    user: 'nodeuser',
    password: '2319',
    port: '5432',
}

const pool = new pg.Pool(config)

function getUser(req, res, next){
    console.log('Getting Credentials')
    pool.connect(function (err, client, done){
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
    pool.end()
}

function getEntry(req, res, next){
    console.log('Getting Credentials')
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
    pool.end()
}

module.exports = {getUser: getUser, getEntry: getEntry}