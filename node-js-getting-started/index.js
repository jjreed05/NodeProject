const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const dbController =  require('./dbController.js')
const bodyParser = require('body-parser')

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/login'))
    .get('/getEntry', dbController.handleJournal)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

