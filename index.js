const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./model/user");


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//aplication/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! wow oh yeahyeah')
})

app.post('/register', (req, res) => {
  //회원가입 시 필요한 정보들을 client에서 가져오면
  //그것들을 DB에 넣어준다
  //회원가입을 위한 라우트
  //endpoit = /register

  const user = new User(req.body)

  user.save((err,doc) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})