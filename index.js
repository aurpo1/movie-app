const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./server/config/key');

const { auth } = require("./server/middleware/auth");
const { User } = require("./server/model/user");


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! wow oh yeahyeah')
})

app.get('/api/hello', (req, res) => {
  res.send("안녕안녕")
})

app.post('/api/user/register', (req, res) => {
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

app.post('/api/user/login', (req, res) => {
  //로그인을 위한 라우트
  //요청된 이메일을 DB에 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) { //요청된 이메일의 값이 없으면
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 사용자가 없습니다."
      })
    }

  //요청된 이메일이 있다면 맞는 비번인지 확인
    user.comparePW(req.body.password, (err, isMatch) => {
      if(!isMatch) //비번 틀렸다
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      //비번이 맞으면 토큰 생성하기
      user.generateT((err, user) => {
        if(err) return res.status(400).send(err);

        //토큰을 어딘가(쿠키, 로컬 스토리지)에 저장한다
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
        
      })
    })
  })
})

//여기까지 왔다는 것은 미들웨어를 통과했다는 이야기는
//authentication이 true
app.get('/api/user/auth', auth, (req, res) => {
  //인증을 위한 라우트
  res.status(200).json({
    _id: req.user._id,
    //role == 0 이면 일반 유저, role != 0 관리자
    isAdmin: req.user.role === 0 ? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/user/logout', auth, (req, res) => {
  //로그아웃을 위한 라우트
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" } //토큰 지워주기
    , (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})