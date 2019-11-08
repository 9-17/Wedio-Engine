const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")

router.get("/403", (req, res) => {
    res.render(path.join(__dirname, "../../../views/error403"))
})

router.get("/404", (req, res) => {
    res.render(path.join(__dirname, "../../../views/error404"))
})


router.get("/500", (req, res) => {
    res.render(path.join(__dirname, "../../../views/error500"))
})

module.exports = router