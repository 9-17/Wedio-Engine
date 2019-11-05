const express = require('express')
const app = express()
const router = express.Router()

router.get("/", (req, res) => {
    res.send("THIS IS EQUALIZER PAGE /pages/cloud/media/equalizer.js")
})

module.exports = router