const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const model =  require('./model.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(cookieParser())
    .use(session({
        key: 'user_sid',
        secret: ';lajl;asjf12415',
        resave: false,
        saveUninitialized: false,
        cookie: {expires: 600000} }))
    .use(isCookieSaved)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', checkSession, (req, res) => res.render('pages/login'))
    .get('/getEntry', model.getEntry)
    .get('/journalPage', checkSession)
    .post('/authenticate', userLogin)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function userLogin(req, res){
    console.log('Logging in user')
    var username = req.body.username
    var password = req.body.password
    var dbUser = model.getUser(req, res)
}

function isCookieSaved(req, res, next) {
    if(req.cookies.user_sid && !req.session.user){
        res.clearCookie('user_sid')
    }
    next()
}

function checkSession(req, res, next) {
    if(req.session.user && req.cookies.user_sid) {
        res.redirect('pages/journalPage')
    }
    else{
        next();
    }
}
