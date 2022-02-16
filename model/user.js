const mongoose = require('mongoose');

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
        type: Number
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

const User = mongoose.model('User', userSchema)

module.exports = {User}  //다른데서도 유저 스키마 쓸 수 있게