const express = require('express')
const app = express()

const PORT = 9562

// 템플릿(퍼그) 세팅
app.set('views','views')
app.set('view engine','pug')

// 정적파일 로드를 위해 
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(PORT, ()=>{
    console.log(`Running on ${PORT}!!`)
})