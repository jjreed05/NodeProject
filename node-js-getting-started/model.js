const pg = require('pg')

function getUser(req, res, next){
    console.log('Getting Credentials')
    pg.connect(process.env.DATABASE_URL, function (err, client, done){
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
    pg.connect(process.env.DATABASE_URL, function (err, client, done){
        if (err) {
            return console.log("Error fetching from pool")
        }
        console.log('Connected to the Database')
        client.query('SELECT * FROM journals', function(err, result){
            done()
            if (err){
                return console.error('error running the query', err)
            }
            res.send(result)
        })
    })
    pool.end()
}

module.exports = {getUser: getUser, getEntry: getEntry}