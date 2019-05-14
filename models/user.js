var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/news',{useNewUrlParser: true})

var Schema = mongoose.Schema

var userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_time:{
        type:String,
    },
    last_modified_time:{
        type:String,
    },
    avatar:{
        type:String,
        default:'defaultUserTX.png'
    },
    bio:{
        type:String,
        default:''
    },
    gender:{
        type:Number,
        enum:[0,1,2],
        default:null
    },
    birthday:{
        type:String,
        default:null
    },
    status:{
        type:Number,
        // 0 没有权限限制
        // 1 不可以评论
        // 2 不可以登录        
        enum:[0,1,2],
        default:0
    },
    attentions:{
        type:Array,
        default:null
    },
    fans:{
        type:Array,
        default:null
    }
})

module.exports = mongoose.model('User',userSchema)