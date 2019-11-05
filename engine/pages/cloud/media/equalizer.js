<<<<<<< HEAD
const express = require('express')
const app = express()
const router = express.Router()

router.get("/", (req, res) => {
    res.send("THIS IS EQUALIZER PAGE /pages/cloud/media/equalizer.js")
})

=======
const express = require('express')
const app = express()
const router = express.Router()

router.get("/", (req, res) => {
    res.send("THIS IS EQUALIZER PAGE /pages/cloud/media/equalizer.js")
})

>>>>>>> d962a2a0eae0880677ceca47b000d8d01c65b1a0
module.exports = router