const express = require('express')
const app = express()
const router = express.Router()
const passport = require("passport")

// Social login routers.
const googleLoginRouter = require("./google")
const naverLoginRouter = require("./naver")

// Passport session
passport.serializeUser((user, done) => {
    // TODO... SERVER LOAD SESSION-TOKEN
    done(null, "be4a8b94-ffcd-11e9-8d71-362b9e155667")
})

passport.deserializeUser((id, done) => {
    // TOTO... SESSION-TOKEN IS VALID?
    done(null, id)
})

// router...
router.get("/signin", (req, res) => {
    res.send("THIS IS LOGIN PAGE. /pages/auth/auth.js")
})

router.post("/signin", (req, res) => {
    res.send("LOGIN EXEC PAGE /pages/auth/auth.js")
})

router.get("/signup", (req, res) => {
    res.send("THIS IS SINGUP PAGE. /pages/auth/auth.js")
})

router.get("/sess-test", (req, res) => {
    res.send("USER LOGIN KET :: " + req.user)
})

router.use("/google", googleLoginRouter)
router.use("/naver", naverLoginRouter)

module.exports = router