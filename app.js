const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const rootRouter = require("./engine/models/router")

// SERVER PORT
const PORT = 9562

app.set('views', 'views')
app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(bodyParser.json())                          // JSON Parseing
app.use(bodyParser.urlencoded({extended: true}))    // URL Parseing

// Setup Router
app.use(rootRouter)

app.listen(PORT, () => {
    console.log(`WEDIO-SERVER is running on ${PORT}`)
})

// app.get('/', (req, res) => {
//     res.render('index')
// })

// app.get('/list', (req, res) => {
//     res.render('list')
// })

// app.get('/upload', (req, res) => {
//     res.render('upload')
// })

// app.get('/playing', (req, res) => {
//     res.render('playing')
// })

// app.listen(PORT, () => {
//     console.log(`Running on ${PORT}!!`)
// })