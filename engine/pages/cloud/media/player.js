const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")

router.get("/", (req, res) => {
    res.render(path.join(__dirname, "../../../../views/playing"))
})

module.exports = router