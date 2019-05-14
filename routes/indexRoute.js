var express = require('express')
var User = require('../models/user')
var Article = require('../models/article')
var Comment = require('../models/comment')
var Reply = require('../models/reply')
var md5 = require('blueimp-md5')
var request = require('request');


// const jsdom = require("jsdom")
// const { JSDOM } = jsdom
// const { window } = new JSDOM(`<!DOCTYPE html>`)
// const $ = require('jQuery')(window)

var fm = require('formidable')
var fs = require('fs')
var path = require('path')



var router = express.Router()

function dateFormat(date, fmt) {
    if (null == date || undefined == date) return '';
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
            (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//渲染首页
router.get('/',function(req,res){
    Article.find({},'_id pic_arr title category author_name comment_num release_time')
    .sort({'sort_time':-1}).limit(20).exec(function(err,_articles){
        if(err){
            res.status(500)
            return
        }
        _articles.forEach(function(item){
            switch(item.category){
                case "shehui": item.category = '社会';break;
                case "guonei": item.category = '国内';break;
                case "guoji": item.category = '国际';break;
                case "yule": item.category = '娱乐';break;
                case "tiyu": item.category = '体育';break;
                case "junshi": item.category = '军事';break;
                case "keji": item.category = '科技';break;
                case "caijing": item.category = '财经';break;
                case "shishang": item.category = '时尚';break;
            }
        })
        Article.find({},'_id pic_arr title read_num').sort({'read_num':-1}).limit(4).exec(function(err,_hotnews){
            if(err){
                res.status(500)
                return
            }
            Article.find({'pic_arr.5':{$exists:true}},'_id title pic_arr')
                .sort({'sort_time':-1})
                .limit(10)
                .exec(function(err,_hotpics){
                if(err){
                    res.status(500)
                    return
                }
                res.render('index.html',{
                    user:req.session.user,
                    articles:_articles,
                    hotnews:_hotnews,
                    hotpics:_hotpics
                })
            })

        })
       
    })
    
})
//根据新闻类别渲染首页
router.get('/index',function(req,res){
    var category = ''
    switch(req.query.id){
        case "1": category = 'shehui';break;
        case "2": category = 'guonei';break;
        case "3": category = 'guoji';break;
        case "4": category = 'yule';break;
        case "5": category = 'tiyu';break;
        case "6": category = 'junshi';break;
        case "7": category = 'keji';break;
        case "8": category = 'caijing';break;
        case "9": category = 'shishang';break;
    }
    
    var p1 = new Promise(function(resolve,reject){
        Article.find({category:category},'_id pic_arr title category author_name comment_num release_time')
        .sort({'sort_time':-1}).limit(20).exec(function(err,_articles){
            if(err){
                res.status(500)
                return
            }
            _articles.forEach(function(item){
                switch(item.category){
                    case "shehui": item.category = '社会';break;
                    case "guonei": item.category = '国内';break;
                    case "guoji": item.category = '国际';break;
                    case "yule": item.category = '娱乐';break;
                    case "tiyu": item.category = '体育';break;
                    case "junshi": item.category = '军事';break;
                    case "keji": item.category = '科技';break;
                    case "caijing": item.category = '财经';break;
                    case "shishang": item.category = '时尚';break;
                }
            })
            resolve(_articles)
        })
    })
    p1.then(function(_articles){
        callback(_articles )
    })

    function callback(_articles){
        var key = '42afb22d691caeb3f2c0dec71163149a'
        var options = {
            method: 'get',
            url: 'http://v.juhe.cn/toutiao/index?type='+ category + '&key=' + key,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        var p2 = new Promise(function(resolve,reject){
            request(options, function (err,res,body) {
                if (err) {
                    console.log(err)
                    return
                }
                resolve(JSON.parse(body).result.data)
            })
        })
        p2.then(function(toutiao){
            Article.find({},'_id pic_arr title read_num').sort({'read_num':-1}).limit(4).exec(function(err,_hotnews){
                if(err){
                    res.status(500)
                    return
                }
                
                Article.find({'pic_arr.5':{$exists:true}},'_id title pic_arr')
                .sort({'sort_time':-1})
                .limit(10)
                .exec(function(err,_hotpics){
                if(err){
                    res.status(500)
                    return
                }
                res.render('index.html',{
                    user:req.session.user,
                    articles:_articles,
                    toutiao:toutiao,
                    hotnews:_hotnews,
                    hotpics:_hotpics
                    })
                })
               
            })
            
        })
    }

    
    
})


//渲染注册页面
router.get('/register',function(req,res){
    res.render('register.html')
})
//注册请求
router.post('/register',function(req,res){
    User.findOne({
        email: req.body.email
    },function(err,data){
        if(err){
            return res.status(500).json({
                err_code:500,
            })
        }
        if(data){
            return res.status(200).json({
                err_code:1
            })
        }
        req.body.password = md5(md5(req.body.password)+'ltw')
        req.body.created_time = dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss")
        req.body.last_modified_time = dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss")
        new User(req.body).save(function(err,user){
            if(err){
                return res.status(500).json({
                    err_code:500,
                })
            }
            req.session.user = user
            res.status(200).json({
                err_code:0
            })
        })
    })
})
//渲染登录页面
router.get('/login',function(req,res){
    res.render('login.html')
})
//登录请求
router.post('/login',function(req,res){
    var status = {email:req.body.email}
    if(req.body.identity == 0){
        status = {
            email:req.body.email,
            status:0
        }
    }
    User.findOne(status,function(err,user){
        if(err){
            return res.status(500).json({
                err_code:500,
            })
        }
        if(!user){
            return res.status(200).json({
                err_code:1
            })
        }
        if(user.password != md5(md5(req.body.password)+'ltw')){
            return res.status(200).json({
                err_code:2
            })
        }
        req.session.user = user
        res.status(200).json({
            err_code:0
        })
    })
    
})
//注销登录
router.get('/logout',function(req,res){
    req.session.user = null
    res.redirect('/')
})
//渲染用户个人界面
router.get('/user',function(req,res){
    if(!req.session.user){
        res.redirect('/login')
        return
    }
    res.render('user.html',{
        user:req.session.user
    })
})
//编辑资料提交
router.get('/modify_data',function(req,res){
    if(!req.session.user){
        res.status(200).json({err_code:5})
        return
    }
    //更新数据库用户信息
    Article.updateMany({'author_id':req.session.user._id},{$set:{'author_name':req.query.nickname}},function(){})
    Comment.updateMany({'user_id':req.session.user._id},{$set:{'user_name':req.query.nickname}},function(){})
    Reply.updateMany({'user_id':req.session.user._id},{$set:{'user_name':req.query.nickname}},function(){})

    User.updateOne({'_id':req.session.user._id},{
        'nickname':req.query.nickname,
        'gender':req.query.gender,
        'birthday':req.query.birthday,
        'bio':req.query.bio,
    },function(err){
        if(err){
            res.status(500).json({
                err_code:500
            })
            return
        }
        //更新session
        User.findById(req.session.user._id,function(err,user){
            if(err){
                res.status(500).json({err_code:500})
                return
            }
            req.session.user = user
            res.status(200).json({err_code:0})
        })
    })
})
//编辑头像提交
router.post('/modify_avatar',function(req,res){
    if(!req.session.user){
        res.status(200).json({err_code:5})
        return
    }
    var form = new fm.IncomingForm()
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.uploadDir = path.join(__dirname,'../public/img/userhead')
    form.parse(req)
    form.on('end',function(){
        // console.log('上传成功');
    })
    form.on('file',function(field,file){
        var extName = ''
        file.name.replace(/([^\.\/\\]+)(\.[a-z]+)$/i,function(matched,$1,$2){
            extName = $2
        })
        var random = parseInt(Math.random()*10000).toString()
        var timeStamp = Date.now()
        var newName = random + timeStamp + extName
        //查询数据库头像地址去删除原有图片
        User.findById(req.session.user._id,function(err,user){
            if(err){
                res.status(500).json({err_code:500})
                return
            }
            if(user.avatar != 'defaultUserTX.png'){
                fs.unlink(form.uploadDir+"\\"+user.avatar,function(err){
                    if(err){
                        res.status(500).json({err_code:500})
                        return
                    }
                })
            }
        })
        //更新数据库头像地址
        Article.updateMany({'author_id':req.session.user._id},{$set:{'author_avatar':newName}},function(){})
        Comment.updateMany({'user_id':req.session.user._id},{$set:{'user_avatar':newName}},function(){})
        Reply.updateMany({'user_id':req.session.user._id},{$set:{'user_avatar':newName}},function(){})

        User.updateOne({'_id':req.session.user._id},{$set:{'avatar':newName}},function(err){
            if(err){
                res.status(500).json({err_code:500})
                return
            }
            //更新session
            User.findById(req.session.user._id,function(err,user){
                if(err){
                    res.status(500).json({err_code:500})
                    return
                }
                req.session.user = user
                res.status(200).json({err_code:0})
            })
        })
        //更换上传的图片存到img里
        fs.renameSync(file.path,path.join(form.uploadDir,newName))
    })
    

})
//修改密码提交
router.post('/modify_psd',function(req,res){
    if(!req.session.user){
        res.status(200).json({err_code:5})
        return
    }
    User.findById(req.session.user._id,function(err,user){
        if(err){
            res.status(500).json({err_code:500})
            return
        }
        if(md5(md5(req.body.oldpsd)+'ltw') != user.password){
            res.status(200).json({err_code:1})
            return
        }
        User.updateOne({"_id":req.session.user._id},{$set:{'password':md5(md5(req.body.password)+'ltw')}},function(err,user){
            if(err){
                res.status(500).json({err_code:500})
                return
            }
            req.session.user = null
            res.status(200).json({err_code:0})
        })
    })
})
//关注提交
router.get('/attention',function(req,res){
    if(req.query.status == 1){
        User.updateOne({'_id':req.session.user._id},{$addToSet:{attentions:req.query.au_id}},function(err){
            if(err){
                res.status(500).json({err_code:500})
                return
            }
            User.updateOne({'_id':req.query.au_id},{$addToSet:{fans:req.session.user._id}},function(err){
                if(err){
                    res.status(500).json({err_code:500})
                    return
                }
                //更新session
                User.findById(req.session.user._id,function(err,user){
                    if(err){
                        res.status(500).json({err_code:500})
                        return
                    }
                    req.session.user = user
                    res.status(200).json({err_code:0})
                })
            })
        })
    }
    if(req.query.status == 0){
        User.updateOne({'_id':req.session.user._id},{$pull:{attentions:req.query.au_id}},function(err){
            if(err){
                res.status(500).json({err_code:500})
                return
            }
            User.updateOne({'_id':req.query.au_id},{$pull:{fans:req.session.user._id}},function(err){
                if(err){
                    res.status(500).json({err_code:500})
                    return
                }
                //更新session
                User.findById(req.session.user._id,function(err,user){
                    if(err){
                        res.status(500).json({err_code:500})
                        return
                    }
                    req.session.user = user
                    res.status(200).json({err_code:0})
                })
            })
        })
    }
    
})
//查看我的关注
router.get('/look_atten',function(req,res){
    User.findOne({'_id':req.query.id},'_id nickname avatar',function(err,data){
        if(err){
            res.status(200).json({err_code:500})
        }
        res.status(200).json({data})
    })
})
//查看我的粉丝
router.get('/look_fan',function(req,res){
    User.findOne({'_id':req.query.id},'_id nickname avatar',function(err,data){
        if(err){
            res.status(200).json({err_code:500})
        }
        res.status(200).json({data})
    })
})
//查看我发布的文章
router.get('/look_news',function(req,res){
    Article.find({'author_id':req.session.user._id},'_id pic_arr title category comment_num release_time')
    .sort({'sort_time':-1}).exec(function(err,_articles){
        if(err){
            res.status(500)
            return
        }
        _articles.forEach(function(item){
            switch(item.category){
                case "shehui": item.category = '社会';break;
                case "guonei": item.category = '国内';break;
                case "guoji": item.category = '国际';break;
                case "yule": item.category = '娱乐';break;
                case "tiyu": item.category = '体育';break;
                case "junshi": item.category = '军事';break;
                case "keji": item.category = '科技';break;
                case "caijing": item.category = '财经';break;
                case "shishang": item.category = '时尚';break;
            }
        })
        res.status(200).json({_articles})
    })
})
//用户删除自己的文章
router.get('/userDel_art',function(req,res){
   Article.deleteOne({'_id':req.query.id},function(err){
        if(err){
            return res.status(500).json({err_code:5})
        }
        res.status(200).json({err_code:0})
    })
})




//a.文章发布（同时）
router.post('/article_release',function(req,res){
    if(!req.session.user){
        res.status(200).json({err_code:5})
        return
    }
    req.body.author_id = req.session.user._id
    req.body.author_name = req.session.user.nickname
    req.body.author_avatar = req.session.user.avatar
    req.body.release_time = dateFormat(new Date(),'yyyy-MM-dd hh:mm')
    new Article(req.body).save(function(err,article){
        if(err){
            res.status(500).json({err_code:500})
            return
        }
        req.session.article_id = article._id
        res.status(200).json({err_code:0})
    })
})
//a.文章图片发布（同时）
router.post('/article_pics_release',function(req,res){
    var form = new fm.IncomingForm()
    form.uploadDir = path.join(__dirname,'../public/img/picture')
    form.parse(req)
    var pic_arr = {}
    var index = 0
    form.on('file',function(name,file){
        var extName = ''
        file.name.replace(/([^\.\/\\]+)(\.[a-z]+)$/i,function(matched,$1,$2){
            extName = $2
        })
        var random = parseInt(Math.random()*10000).toString()
        var timeStamp = Date.now()
        var newName = random + timeStamp + extName
        pic_arr[++index] = newName
        fs.renameSync(file.path,path.join(form.uploadDir,newName))
    })
    form.on('end',function(){
        Article.updateOne({'_id':req.session.article_id},{$set:{'pic_arr':pic_arr}},function(err,article){
            if(err){
                res.status(500).json({err_code:500})
            }
            res.status(200).json({err_code:0})
        })
    })
})
//渲染文章页面
router.get('/article',function(req,res){
    Article.findOne({'_id':req.query.id.replace(/"/g,'')},function(err,_articles){
        if(err){
            res.render('404.html')
            return
        }
        _articles.content = '<p>' + _articles.content.replace(/(\r\n)|(\\+r\\+n)/g,'</p><p>') + '</p>'
        switch(_articles.category){
            case "shehui": _articles.category = '社会';break;
            case "guonei": _articles.category = '国内';break;
            case "guoji": _articles.category = '国际';break;
            case "yule": _articles.category = '娱乐';break;
            case "tiyu": _articles.category = '体育';break;
            case "junshi": _articles.category = '军事';break;
            case "keji": _articles.category = '科技';break;
            case "caijing": _articles.category = '财经';break;
            case "shishang": _articles.category = '时尚';break;
        }
        Article.find({},'_id pic_arr title read_num').sort({'read_num':-1}).limit(4).exec(function(err,_hotnews){
            if(err){
                res.status(500)
                return
            }
            Article.find({'pic_arr.1':{$exists:true}},'_id title pic_arr')
                .sort({'sort_time':-1})
                .limit(10)
                .exec(function(err,_hotpics){
                if(err){
                    res.status(500)
                    return
                }
                res.render('article.html',{
                    article:_articles,
                    user:req.session.user,
                    hotnews:_hotnews,
                    hotpics:_hotpics
                })
            })
        })
    })
    Article.updateOne({'_id':req.query.id.replace(/"/g,'')},{$inc:{read_num:1}},function(){})


})
//查询作者发布的文章(查询指定数量)
router.get('/author_articles',function(req,res){
    Article.find({author_id:req.query.id},'_id title').sort({'sort_time':-1}).limit(4).exec(function(err,data){
        if(err){
            res.status(500).json({err_code:1})
        }
        res.status(200).json(data)
    })
    
})
//文章搜索
router.get('/search',function(req,res){
    var _filter={
        $or: [  // 多字段同时匹配
          {title: {$regex: req.query.text}},
        ]
    }
    Article.find(_filter,"title").limit(6)
    .sort({read_num:1})
    .exec(function(err,data){
        if(err){
            res.status(200).json({err_code:500})
        }
        res.status(200).json(data)
    })
})
//文章搜索提交
router.get('/search_sub',function(req,res){
    Article.find({$or:[{title:{$regex:req.query.searchCon}}]},
        "_id pic_arr title category author_name comment_num release_time")
        .limit(10)
        .sort({read_num:1})
        .exec(function(err,data){
            if(err){
                res.status(200).json({err_code:500})
            }
            data.forEach(function(item){
                switch(item.category){
                    case "shehui": item.category = '社会';break;
                    case "guonei": item.category = '国内';break;
                    case "guoji": item.category = '国际';break;
                    case "yule": item.category = '娱乐';break;
                    case "tiyu": item.category = '体育';break;
                    case "junshi": item.category = '军事';break;
                    case "keji": item.category = '科技';break;
                    case "caijing": item.category = '财经';break;
                    case "shishang": item.category = '时尚';break;
                }
            })
            res.status(200).json(data)
        })
})
//文章页、个人页搜索提交
router.get('/my_search',function(req,res){
    Article.find({$or:[{title:{$regex:req.query.text}}]},
        "_id pic_arr title category author_name comment_num release_time")
        .limit(20)
        .sort({read_num:1})
        .exec(function(err,data){
            if(err){
                res.status(200).json({err_code:500})
            }
            data.forEach(function(item){
                switch(item.category){
                    case "shehui": item.category = '社会';break;
                    case "guonei": item.category = '国内';break;
                    case "guoji": item.category = '国际';break;
                    case "yule": item.category = '娱乐';break;
                    case "tiyu": item.category = '体育';break;
                    case "junshi": item.category = '军事';break;
                    case "keji": item.category = '科技';break;
                    case "caijing": item.category = '财经';break;
                    case "shishang": item.category = '时尚';break;
                }
            })
            Article.find({},'_id pic_arr title read_num').sort({'read_num':-1}).limit(4).exec(function(err,_hotnews){
                if(err){
                    res.status(500)
                    return
                }
                Article.find({'pic_arr.5':{$exists:true}},'_id title pic_arr')
                    .sort({'sort_time':-1})
                    .limit(10)
                    .exec(function(err,_hotpics){
                    if(err){
                        res.status(500)
                        return
                    }
                    res.render('index.html',{
                        user:req.session.user,
                        articles:data,
                        hotnews:_hotnews,
                        hotpics:_hotpics
                    })
                })
    
            })
        })
})



//评论提交
router.post('/comment',function(req,res){
    if(!req.session.user){
        res.status(200).json({err_code:5})
        return
    }
    req.body.article_id = req.body.article_id.replace(/"/g,'')
    req.body.user_id = req.session.user._id
    req.body.user_avatar = req.session.user.avatar
    req.body.user_name = req.session.user.nickname
    req.body.comment_time = dateFormat(new Date(),'yyyy-MM-dd hh:mm')

    new Comment(req.body).save(function(err,comment){
        if(err){
            return res.status(500).json({err_code:500})
        }
        Article.updateOne({_id:req.body.article_id},{$inc:{comment_num:1}},function(){})
        res.status(200).json(comment)
    })
})
//查询对应文章下的所有评论
router.post('/query_comment',function(req,res){
    var id = req.body.id.replace(/"/g,'')
    Comment.find({article_id:id}).exec(function(err,comments){
        if(err){
            return res.status(500).json({err_code:500})
        }
        res.status(200).json(comments)
    })
})
//提交回复
router.post('/reply',function(req,res){
    if(!req.session.user){
        res.status(200).json({err_code:5})
        return
    }
    req.body.comment_id= req.body.comment_id.replace(/"/g,'')
    req.body.user_id = req.session.user._id
    req.body.user_avatar = req.session.user.avatar
    req.body.user_name = req.session.user.nickname
    req.body.reply_time = dateFormat(new Date(),'yyyy-MM-dd hh:mm')

    new Reply(req.body).save(function(err,reply){
        if(err){
            return res.status(500).json({err_code:500})
        }
        Comment.updateOne({"_id":req.body.comment_id},{$inc:{replay_num:1}},function(){})
        Comment.findOne({"_id":req.body.comment_id},'article_id',function(err,data){
            Article.updateOne({"_id":data.article_id},{$inc:{comment_num:1}},function(){})
        })
        res.status(200).json(reply)
    })
})
//查询该评论下的所有回复
router.post('/query_reply',function(req,res){
    var id = req.body.comment_id.replace(/"/g,'')
    Reply.find({comment_id:id}).sort({sort_time:-1}).exec(function(err,replys){
        if(err){
            return res.status(500).json({err_code:500})
        }
        res.status(200).json(replys)
    })
})
//评论的赞
router.get('/comment_zan',function(req,res){
    if(!req.session.user){
        res.status(200).json({err_code:5})
        return
    }
    Comment.updateOne({"_id":req.query.comment_id},{$inc:{zan_num:1}},function(){
        res.status(200)
    })
})
//回复的赞
router.get('/reply_zan',function(req,res){
    if(!req.session.user){
        res.status(200).json({err_code:5})
        return
    }
    Reply.updateOne({"_id":req.query.reply_id},{$inc:{zan_num:1}},function(){
        res.status(200)
    })
})


//后台管理系统
//渲染后台页面
router.get('/sys',function(req,res){
    res.render('manage.html')
})
//加载用户管理数据
router.get('/userSys',function(req,res){
    User.find({status:1},'_id nickname email password last_modified_time status',function(err,users){
        if(err){
            return res.status(500).json({err_code:5})
        }
        res.status(200).json(users)
    })
})
//删除用户
router.get('/delete_user',function(req,res){
    User.deleteOne({_id:req.query.id},function(err){
        if(err){
            return res.status(500).json({err_code:5})
        }
        res.status(200).json({err_code:0})
    })
})


module.exports = router





// var local = require('./models/local')

// app.get('/local/repeat', function (req, res) {
// var keyword = req.query.keyword // 获取查询的字段

// var _filter={
//    $or: [  // 多字段同时匹配
//      {cn: {$regex: keyword}},
//      {key: {$regex: keyword, $options: '$i'}}, //  $options: '$i' 忽略大小写
//      {en: {$regex: keyword, $options: '$i'}}
//    ]
//  }
//  var count = 0
//  local.count(_filter, function (err, doc) { // 查询总条数（用于分页）
//    if (err) {
//      console.log(err)
//    } else {
//      count = doc
//    }
//  })

//  local.find(_filter).limit(10) // 最多显示10条
//    .sort({'_id': -1}) // 倒序
//    .exec(function (err, doc) { // 回调
//      if (err) {
//        console.log(err)
//      } else {
//        res.json({code: 0, data: doc, count: count})
//      }
//    })
// })