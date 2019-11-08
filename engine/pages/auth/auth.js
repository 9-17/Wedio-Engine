const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")
const passport = require("passport")
const database = require("../../models/database")
const auth = require("../../models/authentication")             // Login Manager

// Social login routers.
const googleLoginRouter = require("./google")
const naverLoginRouter = require("./naver")

// Passport session
passport.serializeUser((user, done) => {
    database.conn.query(database.queries.AUTH_OBTAIN_SESS_TOKEN, [user.uuid, user.provider], (err, rows) => {
        if(err) {
            return done(err, false, { "message": "MySQL Server error." })
        } else {
            if(rows.length == 0) {
                return done({ "message": "session is not valid." }, false)
            } else {
                return done(null, rows[0].session_token)
            }
        }
    })
    
})

passport.deserializeUser((id, done) => {
    database.conn.query(database.queries.AUTH_OBTAIN_ACCOUNT, [id], (err, rows) => {
        if(err) {
            return done(err, false)
        } else {
            if(rows.length == 0) {
                return done({ "message": "session is not valid." }, false)
            } else {
                let account = {
                    provider: rows[0].auth_provider,
                    uuid: rows[0].auth_uuid,
                    name: rows[0].user_name,
                    photo: rows[0].user_photo,
                    sess_token: id
                }
                return done(null, account)
            }
        }
    }) 
})

// router...
router.get("/signin", (req, res) => {
    auth.redirectIfLogin(req, 
        function(){ res.redirect("../cloud/") },
        function(){ res.render(path.join(__dirname, "../../../views/signin")) })
    
})

router.post("/signin", (req, res) => {
    res.send("LOGIN EXEC PAGE /pages/auth/auth.js")
})

router.get("/signup", (req, res) => {
    auth.redirectIfLogin(req, 
        function(){ res.redirect("../cloud/") },
        function(){ res.send("THIS IS SIGNUP PAGE. /pages/auth/auth.js") })
})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("../../")
})

router.use("/google", googleLoginRouter)
router.use("/naver", naverLoginRouter)

module.exports = router