const express = require('express')
const app = express()
const router = express.Router()

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
        photo: profile._json.profile_image
    }

    return done(null, naverLoginData)
}))

router.get("/", passport.authenticate("naver"))

router.get("/redirect", passport.authenticate("naver", { failureRedirect: "../signin" }), (req, res) => {
    // facebook login successed.
    res.send("naver LOGIN OK.")
})

module.exports = router