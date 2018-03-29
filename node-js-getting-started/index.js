const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const controller =  require('./controller.js')
const bodyParser = require('body-parser')
const session = require('express-session')


express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(session({
        secret: 'afsfw452rwjektbwkt345werfdefffsfw34r&&saff3',
        resave: false,
        saveUninitialized: false
    }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/login'))
    .get('/journal', controller.verifyLogin, (req, res) => res.render('pages/journalPage'))
    .get('/getEntry', controller.handleJournal)
    .get('/logout', controller.handleLogout)
    .post('/authenticate', controller.handleLogin)
    .post('/postEntry', controller.handleNewEntry)
    .delete('/deleteEntry', controller.handleDeletion)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

