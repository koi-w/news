var express = require('express')
var path = require('path')
var indexRoute = require('./routes/indexRoute')
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express()

//静态资源放行
app.use('/public/',express.static(path.join(__dirname, './public/')))
app.use('/public/',express.static(path.join(__dirname, './public/')))
app.use('/node_modules/',express.static(path.join(__dirname, './node_modules/')))
//开启模板引擎
app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/')) //默认就是views(视图目录)
//接收post
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//配置session
app.set('trust proxy', 1)
app.use(session({
  secret: 'ltw',
  resave: false,
  saveUninitialized: true,
}))


//挂载路由
app.use(indexRoute)


//开启服务，监听3000端口
app.listen(3000,function(){
    console.log('Running...')
})