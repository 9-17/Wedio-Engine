const express = require('express')
const app = express()
const router = express.Router()
const path = require("path")
const auth = require("../../models/authentication")             // Login Manager
const database = require("../../models/database")               // Database Manager
const fs = require('fs')

router.get("/delete", (req, res) => {
    let fileName = req.param("file_name", null)
    
    if(auth.checkLogin(req)) {
        // AUTH 검증 -> OK.
        let session_token = req.user.sess_token
        
        database.conn.query(database.queries.CLOUD_REMOVE_FILE, [session_token, fileName], (err, rows) => {
            if(err) {
                res.redirect("../../error/404")
            } else {
                try {
                    // Remove file.
                    fs.unlinkSync(path.join(__dirname, "../../../upload/") + fileName)
                } catch(err) {}

                res.redirect("../")
            }
        })
    } else {
        res.redirect("../../error/403")
    }
})

module.exports = router