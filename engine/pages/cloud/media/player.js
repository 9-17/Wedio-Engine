const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")
const auth = require("../../../models/authentication")             // Login Manager
const database = require("../../../models/database")               // Database Manager

router.get("/", (req, res) => {
    let fileName = req.param("file_name", null)

    if(fileName == null) {
        res.redirect("../../../error/404")
    } else {
        if(auth.checkLogin(req)) {
            database.conn.query(database.queries.CLOUD_OBTAIN_ONE_FILE, [req.user.sess_token, fileName], (err, rows) => {
                if(err) {
                    res.sendStatus(500)
                } else {
                    if(rows.length == 0) {
                        res.send("파일이 존재하지 않습니다.")
                    } else {
                        let fileObject = {
                            owner: rows[0].file_owner,
                            origin_name: rows[0].file_origin_name,
                            saved_name: rows[0].file_saved_name,
                            size: rows[0].file_size,
                            created: rows[0].created
                        }
                        res.render(path.join(__dirname, "../../../../views/playing"), { "user": req.user, "file": fileObject })
                    }
                }
            })
        } else {
            res.redirect("../../auth/signin")
        }
    }
})

module.exports = router