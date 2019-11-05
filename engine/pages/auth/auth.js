const express = require('express')
const app = express()
const router = express.Router()
const passport = require("passport")
const database = require("../../models/database")

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
                    photo: rows[0].user_photo
                }
                return done(null, account)
            }
        }
    }) 
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

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("../../")
})

router.get("/sess-test", (req, res) => {
    res.send(req.user)
})

router.use("/google", googleLoginRouter)
router.use("/naver", naverLoginRouter)

module.exports = router