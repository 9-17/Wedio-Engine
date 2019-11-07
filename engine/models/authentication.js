const express = require('express')
const app = express()

var auth = {
    checkLogin: function(req) {

        try {
            return req.user !== undefined
        } catch(err) {
            return false
        }
    },
    redirectIfLogin: function(req, logined, notlogin) {
        if(this.checkLogin(req)) {
            logined()
        } else {
            notlogin()
        }
    }
}

module.exports = auth