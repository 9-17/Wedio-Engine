<<<<<<< HEAD
const express = require('express')
const app = express()
const router = express.Router()

const googleLoginRouter = require("./google")
const twitterLoginRouter = require("./twitter")

router.get("/signin", (req, res) => {
    res.send("THIS IS LOGIN PAGE. /pages/auth/auth.js")
})

router.post("/signin", (req, res) => {
    res.send("LOGIN EXEC PAGE /pages/auth/auth.js")
})

router.get("/signup", (req, res) => {
    res.send("THIS IS SINGUP PAGE. /pages/auth/auth.js")
})

router.use("/google", googleLoginRouter)
router.use("/twitter", twitterLoginRouter)

=======
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

>>>>>>> d962a2a0eae0880677ceca47b000d8d01c65b1a0
module.exports = router