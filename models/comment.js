var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/news',{useNewUrlParser: true})

var Schema = mongoose.Schema

var commentSchema = new Schema({
    user_id:{
        type:String,
        required:true
    },
    article_id:{
        type:String,
        required:true
    },
    user_avatar:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    comment_content:{
        type:String,
        required:true
    },
    comment_time:{
        type:String,
        required:true
    },
    sort_time:{
        type:Date,
        default:Date.now
    },
    zan_num:{
        type:Number,
        default:0
    },
    replay_num:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model('Comment',commentSchema)