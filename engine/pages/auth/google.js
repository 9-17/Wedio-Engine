const express = require('express')
const app = express()
const router = express.Router()

const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.use(new GoogleStrategy({
    clientID: "918721475745-g9b1oakdfor5c4hsb2qpn18a23u2fq3c.apps.googleusercontent.com",
    clientSecret: "fdK9R_fGLCp23h6JW90s5YFJ",
    callbackURL: "http://wedio.saintdev.kr/auth/google/redirect"
}, (accessToken, refreshToken, profile, done) => {
    let googleLoginData = {
        provider: "google",
        uuid: profile.id,
        name: profile.displayName,
        photo: profile.photos[0].value
    }

    return done(null, googleLoginData)
}))

router.get("/", passport.authenticate("google", { scope: ['profile'] }))

router.get("/redirect", passport.authenticate("google", {failureRedirect: "../singin"}), (req, res) => {
    // google login successed.
    res.send("GOOGLE LOGIN OK.")
})

module.exports = router