const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const rootRouter = require("./engine/models/router")

const passport = require("passport")
const session = require("express-session")
const flash = require("connect-flash")

// SERVER PORT
const PORT = 9562

app.set('views', 'views')
app.set('view engine', 'pug')

app.use(express.static('public'))
app.use('/music', express.static('upload'))
app.use(bodyParser.json())                          // JSON Parseing
app.use(bodyParser.urlencoded({extended: true}))    // URL Parseing

// Passport init.
app.use(session({
    secret: "3a4b1eea-ca53-4b4a-8b14-1044abe34b75",
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Setup Router
app.use(rootRouter)

app.listen(PORT, () => {
    console.log(`WEDIO-SERVER is running on ${PORT}`)
})