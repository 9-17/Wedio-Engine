const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")

router.get("/", (req, res) => {
    if(req.user == undefined) {
        res.render(path.join(__dirname, "../../../views/index"))
    } else {
        res.render(path.join(__dirname, "../../../views/index"), { "user": req.user })
    }
})

module.exports = router