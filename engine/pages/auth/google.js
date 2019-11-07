const express = require('express')
const app = express()
const router = express.Router()
const database = require("../../models/database")
const uuidv4 = require('uuid/v4')

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

    database.conn.query(database.queries.AUTH_OBTAIN_SESS_TOKEN, [profile.id, googleLoginData.provider], (err, rows) => {
        if(err) {
            return done(null, false, { message: "MySQL connection error." })
        } else {
            if(rows.length == 0) {
                // 가입 정보가 없다면, 가입 한다.
                database.conn.query(database.queries.AUTH_SIGNUP, 
                    [profile.id, uuidv4(), googleLoginData.provider, googleLoginData.name, googleLoginData.photo, null], (err, rows) => {
                    if(err) {
                        return done(null, false, { message: "MySQL connection error." })
                    } else {
                        return done(null, googleLoginData)
                    }
                })
            } else {
                return done(null, googleLoginData)
            }
        }
    })
}))

router.get("/", passport.authenticate("google", { scope: ['profile'] }))

router.get("/redirect", passport.authenticate("google", {failureRedirect: "../signin"}), (req, res) => {
    // google login successed.
    res.redirect("../../cloud")
})

module.exports = router