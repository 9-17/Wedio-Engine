const express = require('express')
const app = express()
const router = express.Router()
const auth = require("../../../models/authentication")             // Login Manager

router.get("/", (req, res) => {
    auth.redirectIfLogin(req, 
        function(){ res.render(path.join(__dirname, "../../../../views/playing"), { "user": req.user }) },
        function(){ res.redirect("../../auth/signin") })
})

module.exports = router