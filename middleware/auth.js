const { User } = require("../model/user");


let auth = (req, res, next) => {

    //인증 처리하는 곳

    //클라이언트 쿠키에서 토근 가져와

    let token = req.cookies.x_auth;

    //토근을 복호화하고 유저를 찾는다'

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        //token과 user 정보를 다른데서 쓸 수 있게 reqest에 넣어줌
        req.token = token;
        req.user = user;
        next();
    })

    //유저가 있으면 인증 ok 없으면 인증 no
}

//다른 파일들에서도 쓸 수 있게 만드는 코드
module.exports = { auth };