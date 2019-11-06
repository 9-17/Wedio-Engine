const express = require('express')
const app = express()
const router = express.Router()
const auth = require("../../../models/authentication")             // Login Manager

router.get("/", (req, res) => {
    auth.redirectIfLogin(req, 
        function(){ res.send("THIS IS EQUALIZER PAGE /pages/cloud/media/equalizer.js") },
        function(){ res.redirect("../../auth/signin") })
})

module.exports = router