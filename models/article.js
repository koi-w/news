var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/news',{useNewUrlParser: true})

var Schema = mongoose.Schema

var articleSchema = new Schema({
    author_id:{
        type:String,
        required:true
    },
    author_name:{
        type:String,
        required:true
    },
    author_avatar:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
    },
    release_time:{
        type:String,
        required:true
    },
    comment_num:{
        type:Number,
        default:0
    },
    read_num:{
        type:Number,
        default:0
    },
    pic_arr:{
        type:Object,
    },
    sort_time:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('Article',articleSchema)