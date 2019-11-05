<<<<<<< HEAD
const express = require('express')
const app = express()
const router = express.Router()

router.use("/", require("../pages/home/index"))
router.use("/cloud", require("../pages/cloud/index"))     // Server of WEDIO Cloud system.
router.use("/auth", require("../pages/auth/auth"))        // Auth server

=======
const express = require('express')
const app = express()
const router = express.Router()

router.use("/", require("../pages/home/index"))
router.use("/cloud", require("../pages/cloud/index"))     // Server of WEDIO Cloud system.
router.use("/auth", require("../pages/auth/auth"))        // Auth server

>>>>>>> d962a2a0eae0880677ceca47b000d8d01c65b1a0
module.exports = router