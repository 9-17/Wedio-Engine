const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")
const auth = require("../../models/authentication")             // Login Manager

const mediaEqualizerRouter = require("./media/equalizer")
const mediaPlayerRouter = require("./media/player")
const mediaUploaderRouter = require("./media/uploader")

const cloudController = require("./cdctrl")

router.get("/", (req, res) => {
    auth.redirectIfLogin(req, 
        function(){ res.render(path.join(__dirname, "../../../views/list"),{"user":req.user}) },
        function(){ res.redirect("../auth/signin") })
})

router.use("/media/equalizer", mediaEqualizerRouter)
router.use("/media/player", mediaPlayerRouter)
router.use("/media/uploader", mediaUploaderRouter)
router.use("/ctrl", cloudController)

module.exports = router