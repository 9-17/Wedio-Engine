<<<<<<< HEAD
const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")


router.get("/", (req, res) => {
    res.render(path.join(__dirname, "../../../../views/upload"))
})

=======
const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")


router.get("/", (req, res) => {
    res.render(path.join(__dirname, "../../../../views/upload"))
})

>>>>>>> d962a2a0eae0880677ceca47b000d8d01c65b1a0
module.exports = router