//환경변수 procexx.env.NODE_ENV가
//production, 즉 배포한 이후이면 prod.js 실행
//development, 즉 local환경에서 이면 dev.js 실행
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev')
}