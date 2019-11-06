const express = require('express')
const app = express()

var auth = {
    checkLogin: function(req) {
        return req.user != undefined
    },
    redirectIfLogin(req, logined, notlogin) {
        if(this.checkLogin(req)) {
            logined()
        } else {
            notlogin()
        }
    }
}

module.exports = auth