const express = require('express')
const app = express()
const router = express.Router()
const database = require("../../models/database")
const uuidv4 = require('uuid/v4');

const passport = require("passport")
const NaverStrategy = require("passport-naver").Strategy

passport.use(new NaverStrategy({
    clientID: "fd2D7O9jUCzUIT_5Ezgo",
    clientSecret: "abGsaESQiy",
    callbackURL: "http://wedio.saintdev.kr/auth/naver/redirect"
}, (accessToken, refreshToken, profile, done) => {
    let naverLoginData = {
        provider: "naver",
        uuid: profile.id,
        name: profile.displayName,
        photo: profile._json.profile_image,
        email: profile.emails[0].value == null ? null : profile.emails[0].value
    }

    database.conn.query(database.queries.AUTH_OBTAIN_SESS_TOKEN, [profile.id, naverLoginData.provider], (err, rows) => {
        if(err) {
            console.log(err)
            return done(null, false, { message: "MySQL connection error." })
        } else {
            if(rows.length == 0) {
                // 가입 정보가 없다면, 가입 한다.
                database.conn.query(database.queries.AUTH_SIGNUP, 
                    [profile.id, uuidv4(), naverLoginData.provider, naverLoginData.name, naverLoginData.photo, naverLoginData.email], (err, rows) => {
                    if(err) {
                        console.log(err)
                        return done(null, false, { message: "MySQL connection error." })
                    } else {
                        return done(null, naverLoginData)
                    }
                })
            } else {
                return done(null, naverLoginData)
            }
        }
    })
}))

router.get("/", passport.authenticate("naver"))

router.get("/redirect", passport.authenticate("naver", { failureRedirect: "../signin" }), (req, res) => {
    // naver login successed.
    res.redirect("../../cloud")
})

module.exports = router