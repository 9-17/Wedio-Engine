const express = require('express')
const app = express()
const router = express.Router()

router.get("/signin", (req, res) => {
    res.send("THIS IS LOGIN PAGE. /pages/auth/auth.js")
})

router.post("/signin", (req, res) => {
    res.send("LOGIN EXEC PAGE /pages/auth/auth.js")
})

router.get("/signup", (req, res) => {
    res.send("THIS IS SINGUP PAGE. /pages/auth/auth.js")
})

module.exports = router