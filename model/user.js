const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //띄어쓰기 없애주는 역할
        unique: 1 //유일
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


//저장하기 전(pre)에 암호화 해라
userSchema.pre('save', function( next ) {
    var user = this; //위에 모델

    if(user.isModified('password')) {
        //비번 바꿀 때만 암호화 해라(다른 값 바꿀때마다 비번 암호화할 필요 x)

        //bcrypt로 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            //err가 있으면 index.js에 있는 err로 가라(next)
            if(err) return next(err)
            
            //hash(나의 원래 비번, salt, 함수)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash //hash된 비번으로 바꿔줌
                next()
            })
    
        })
    } else { //아닐 때는 next로 그냥 가라
        next()
    }
})

//cb는 callback
userSchema.methods.comparePW = function(plainPW, cb) {
    //받은 plainpw를 암호화해서 암호화된 비번이 맞는지 체크
    bcrypt.compare(plainPW, this.password, function(err, isMatch) {
        if(err) return cb(err);
            cb(null, isMatch); //err가 없으면 isMatch 값 정상적으로 보내기
    })
}

userSchema.methods.generateT = function(cb) {
    var user = this;
    
    //jsonwebtoken을 이용해서 token생성
   var token = jwt.sign(user._id.toHexString(), 'secretT')

   //user._id + 'secretT' = token 이렇게 생성해놓고
   //나중에 'secretT'로 user._id 알 수 있다

   user.token = token //위 필드에 넣기
   user.save(function(err, user) {
       if(err) return cb(err)
        cb(null, user) //err가 없으면 정보 정상적으로 보내기
   })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    
    //토근을 복호화한다
    jwt.verify(token, 'secretT', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 후에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}  //다른데서도 유저 스키마 쓸 수 있게