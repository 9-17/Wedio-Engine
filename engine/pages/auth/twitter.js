const express = require('express')
const app = express()
const router = express.Router()

const passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy

passport.use(new TwitterStrategy({
    consumerKey: "",
    consumerSecret: "",
    callbackURL: "http://wedio.saintdev.kr/auth/twitter/redirect"
}, (token, tokenSecret, profile, done) => {
    console.log("=-=-=-=-=-=-=-= TWITTER LOGIN!!!! =-=-=-=-=-=-=-=")
    console.log(profile)

    done(null, profile)
}))

router.get("/", passport.authenticate("twitter"))

router.get("/redirect", passport.authenticate("twitter", {failureRedirect: "../signin"}), (req, res) => {
    res.send("TWITTER LOGIN OK.")
})

module.exports = router