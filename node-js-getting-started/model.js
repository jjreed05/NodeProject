//For local host
/*const pg = require('pg')
const config = {
    database: 'journaldb',
    user: 'nodeuser',
    password: '2319',
    port: '5432',
}

const pool = new pg.Pool(config)*/

const {Client} = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

function getUser(req, res, next){
    console.log('Getting Credentials')
    client.connect(function (err, client, done){
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
    client.end()
}

function getEntry(req, res, next){
    console.log('Getting Credentials')
    client.connect()
    client.query('SELECT * FROM journals', (err, res) =>{
        if(err) throw err
        res.send(res.rows[0].entry)
    })
    client.end()
}

module.exports = {getUser: getUser, getEntry: getEntry}