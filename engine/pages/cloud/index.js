const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")
const auth = require("../../models/authentication")             // Login Manager
const database = require("../../models/database")               // Database Maager

const mediaEqualizerRouter = require("./media/equalizer")
const mediaPlayerRouter = require("./media/player")
const mediaUploaderRouter = require("./media/uploader")

const cloudController = require("./cdctrl")

router.get("/", (req, res) => {
    if(auth.checkLogin(req)) {
        database.conn.query(database.queries.CLOUD_OBTAIN_FILES, [req.user.sess_token], (err, rows) => {
            let cloudData = {
                size: 0,
                file_origin_names: [],
                file_saved_names: [],
                file_sizes: [],
                file_created: []
            }

            for(let i = 0; i < rows.length; ++i) {
                cloudData.size++
                cloudData.file_origin_names[i] = rows[i].file_origin_name
                cloudData.file_saved_names[i] = rows[i].file_saved_name
                cloudData.file_sizes[i] = rows[i].file_size
                cloudData.file_created[i] = rows[i].created
            }

            res.render(path.join(__dirname, "../../../views/list"),{"user":req.user, "cloud": cloudData})
        })
    } else {
        res.redirect("../auth/signin")
    }
})

router.use("/media/equalizer", mediaEqualizerRouter)
router.use("/media/player", mediaPlayerRouter)
router.use("/media/uploader", mediaUploaderRouter)
router.use("/ctrl", cloudController)

module.exports = router