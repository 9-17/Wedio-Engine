const express = require('express')
const app = express()
const router = express.Router()

router.use("/", require("../pages/home/index"))
router.use("/cloud", require("../pages/cloud/index"))     // Server of WEDIO Cloud system.
router.use("/auth", require("../pages/auth/auth"))        // Auth server
router.use("/error", require("../pages/errors/error"))

module.exports = router