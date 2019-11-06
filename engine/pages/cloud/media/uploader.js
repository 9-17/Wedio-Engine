const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")
const auth = require("../../../models/authentication")             // Login Manager

const multer = require("multer")
const database = require("../../../models/database")
const fs = require('fs')

const upload = multer({
    dest: path.join(__dirname, "../../../../upload/"), 
    fileFilter: function(req, file, callback) {
        let ext = path.extname(file.originalname)
        let ownerToken = req.user

        if(ownerToken == undefined) {
            // Not login!
            return callback(new Error("Auth error."))
        } else {
            // Check ext.
            if(ext == ".mp3" || ext == ".wav") {
                // cloud valid
                return callback(null, true)
            } else {
                return callback(new Error("Not support extension."))
            }
        }
    }
})


router.get("/", (req, res) => {
    auth.redirectIfLogin(req, 
        function(){ res.render(path.join(__dirname, "../../../../views/upload")) },
        function(){ res.redirect("../../auth/signin") })
})

router.post("/", upload.single("file"), (req, res) => {
    // 파일 정보를 DB 에 등록 한다.
    let ownerToken = req.user
    let file = req.file

    if(ownerToken == undefined) {
        res.sendStatus(403)
        return
    } else {
        // Check cloud is valid
        database.conn.query(database.queries.CLOUD_CHECK_SIZE, [ownerToken.sess_token], (err, rows) => {
            if(err) {
                // MySQL Error
                return res.send("MySQL Server error.")
            } else {
                // Calc used size.
                let totalSize = file.size
                for(let i = 0; i < rows.length; ++i) {
                    totalSize += rows[i].file_size
                }

                database.conn.query(database.queries.AUTH_OBTAIN_ACCOUNT, [ownerToken.sess_token], (err, rows) => {
                    if(err) {
                        return res.send("MySQL Server error.")
                    } else {
                        if(rows[0].cloud_storage < totalSize) {
                            // Cloud out of size.
                            try {
                                fs.unlinkSync(file.path)
                            } catch(err) {

                            }
                            return res.send("Your cloud is full.")
                        } else {
                            // Regist database.
                            database.conn.query(database.queries.CLOUD_ADD_MUSIC, [ownerToken.uuid, file.originalname, file.filename, file.size], (err, rows) => {
                                if(err) {
                                    res.sendStatus(500)
                                } else {
                                    res.redirect("../")
                                }
                            })
                        }
                    }
                })
            }
        })
    }
})

module.exports = router