$(function(){
    var reg  = ''
    var str = $('.article .p').text()
    var emojis = ['微笑','爱慕','惊呆','酷拽','抠鼻','流泪','发怒','呲牙','鼾睡','害羞','可爱','晕','衰','闭嘴','机智',
        '来看我','灵光一闪','耶','捂脸','打脸','大笑','哈欠','震惊','送心','困','what','泣不成声','小鼓掌','酷','偷笑','石化',
        '思考','吐血','可怜','嘘','撇嘴','黑线','笑哭','雾霾','奸笑','得意','憨笑','抓狂','泪奔','钱','吻','恐惧','笑','快哭了',
        '翻白眼','互粉','赞','鼓掌','谢谢','kiss','去污粉','666','玫瑰','胡瓜','啤酒','我想静静','委屈','舔屏','鄙视','飞吻','再见',
        '紫薇别走','求抱抱','听歌','周冬雨的凝视','马思纯的微笑','吐舌','呆无辜','看','白眼','熊吉','骷髅','黑脸','吃瓜群众','绿帽子',
        '汗','摸头','皱眉','擦汗','红脸','尬笑','做鬼脸','强','如花','吐','惊喜','敲打','奋斗','吐彩虹','大哭','比心','加油','碰拳',
        'ok','击掌','左上','握手','18禁','刀','V5','给力','心','伤心','屎','礼物','蛋糕','撒花','不看','炸弹'];
    var address = ['emoji_1_smile@3x.png',
                       'emoji_2_kiss@3x.png',
                       'emoji_3_daze@3x.png',
                       'emoji_4_smoke@3x.png',
                       'emoji_5_pick_nose@3x.png',
                       'emoji_6_cry@3x.png',
                       'emoji_7_anger@3x.png',
                       'emoji_8_laugh@3x.png',
                       'emoji_9_sleep@3x.png',
                       'emoji_10_shy@3x.png',
                       'emoji_11_naughty@3x.png',
                       'emoji_12_dizzy@3x.png',
                       'emoji_13_stunned@3x.png',
                       'emoji_14_shut_up@3x.png',
                       'emoji_15_wit@3x.png',
                       'emoji_16_attention@3x.png',
                       'emoji_17_hand_sample@3x.png',
                       'emoji_18_ye@3x.png',
                       'emoji_19_distress_situation@3x.png',
                       'emoji_20_play_face@3x.png',
                       'emoji_21_smile@3x.png',
                       'emoji_22_yawn@3x.png',
                       'emoji_23_surprise@3x.png',
                       'emoji_24_take_heart@3x.png',
                       'emoji_25_sleepy@3x.png',
                       'emoji_26_what@3x.png',
                       'emoji_27_sobbing@3x.png',
                       'emoji_28_handclap@3x.png',
                       'emoji_29_cool@3x.png',
                       'emoji_30_titter@3x.png',
                       'emoji_31_lightning_strike@3x.png',
                       'emoji_32_meditation@3x.png',
                       'emoji_33_vomiting_blood@3x.png',
                       'emoji_34_acting_cute@3x.png',
                       'emoji_35_quietly@3x.png',
                       'emoji_36_hum@3x.png',
                       'emoji_37_khan@3x.png',
                       'emoji_38_forced_smile@3x.png',
                       'emoji_39_haze@3x.png',
                       'emoji_40_smirk@3x.png',
                       'emoji_41_cool@3x.png',
                       'emoji_42_bad_smile@3x.png',
                       'emoji_43_crazy@3x.png',
                       'emoji_44_tears@3x.png',
                       'emoji_45_money@3x.png',
                       'emoji_46_kiss@3x.png',
                       'emoji_47_fear@3x.png',
                       'emoji_48_smile@3x.png',
                       'emoji_49_injustice@3x.png',
                       'emoji_50_their@3x.png',
                       'emoji_51_focus@3x.png',
                       'emoji_52_like@3x.png',
                       'emoji_53_handclap@3x.png',
                       'emoji_54_3Q@3x.png',
                       'emoji_55_kiss@3x.png',
                       'emoji_56_household_cleanser@3x.png',
                       'emoji_57_666@3x.png',
                       'emoji_58_rose@3x.png',
                       'emoji_59_cucumber@3x.png',
                       'emoji_60_beer@3x.png',
                       'emoji_61_distress_situation@3x.png',
                       'emoji_62_injustice@3x.png',
                       'emoji_63_lick_screen@3x.png',
                       'emoji_64_despise@3x.png',
                       'emoji_65_kiss@3x.png',
                       'emoji_66_bye@3x.png',
                       'emoji_67_erkang@3x.png',
                       'emoji_68_hug@3x.png',
                       'emoji_69_hitler@3x.png',
                       'emoji_70_zhoudongyu_gaze@3x.png',
                       'emoji_71_masichun_smile@3x.png',
                       'emoji_72_dogo@3x.png',
                       'emoji_73_cat@3x.png',
                       'emoji_74_2ha@3x.png',
                       'emoji_75_dogo@3x.png',
                       'emoji_76_bear@3x.png',
                       'emoji_77_skeleton@3x.png',
                       'emoji_78_black_face@3x.png',
                       'emoji_79_eat_melon@3x.png',
                       'emoji_80_green_hat@3x.png',
                       'emoji_81_sweat@3x.png',
                       'emoji_82_lear_ropes@3x.png',
                       'emoji_83_frown@3x.png',
                       'emoji_84_wipe_sweat@3x.png',
                       'emoji_85_redface@3x.png',
                       'emoji_86_orz@3x.png',
                       'emoji_87_makeface@3x.png',
                       'emoji_88_intensity@3x.png',
                       'emoji_89_ruhua@3x.png',
                       'emoji_90_spit@3x.png',
                       'emoji_91_surprise@3x.png',
                       'emoji_92_knock@3x.png',
                       'emoji_93_refuel@3x.png',
                       'emoji_94_rainbow@3x.png',
                       'emoji_95_bigcry@3x.png',
                       'emoji_96_fingerheart@3x.png',
                       'emoji_97_refuel@3x.png',
                       'emoji_98_fist@3x.png',
                       'emoji_99_OK@3x.png',
                       'emoji_100_highfive@3x.png',
                       'emoji_101_left@3x.png',
                       'emoji_102_shakehand@3x.png',
                       'emoji_103_18@3x.png',
                       'emoji_104_knife@3x.png',
                       'emoji_105_V5@3x.png',
                       'emoji_106_awesome@3x.png',
                       'emoji_107_heart@3x.png',
                       'emoji_108_broken_heart@3x.png',
                       'emoji_109_shit@3x.png',
                       'emoji_110_gifts@3x.png',
                       'emoji_111_cake@3x.png',
                       'emoji_112_flower@3x.png',
                       'emoji_113_lookat@3x.png',
                       'emoji_114_bomb@3x.png']
    emojis.forEach(function(item,index){
        reg = new RegExp('\\['+ item +'\\]','g')
        str = str.replace(reg, '<i style="background-image:url(../public/img/emoticon/' + address[index] + '")></i>')
    })
    //加载内容
    $('.article .p').html(str)

    //加载作者的所有文章
    ;;(function(){
        var author_id = $('#author_articles').val()
        $.ajax({
            url:'/author_articles',
            type:'get',
            data:{id:author_id},
            dataType:'json',
            success:function(data){
                data.forEach(function(item,index){
                    var a = document.createElement('a')
                    var dd = document.createElement('dd')
                    a.href = "/article?id=" + item['_id']
                    a.innerText = item['title']
                    dd.appendChild(a)
                    $('.author dl').append(dd)
                })
            }
        })

    })();

    //点击加载评论
    $('.comment_mask').on('click',function(){
        $('.comment').show()
        getComments()
        
    })
    $('#clo1-menu').on('click',function(){
        $('.comment').show()
        getComments()
    })

    //评论框变高
    $('#comment-input').focus(function(){
        $(this).animate({height:"150px"});
        $('.div-pl').animate({marginTop:"100px"})
    });

    //提交评论
    $('.div-pl').on('click',function(){
        var value = $('#comment-input').val().trim()
        var id = $('#article_id').val()
        if(value.length === 0) return
        $.ajax({
            url:'/comment',
            type:'post',
            data:{article_id:id,comment_content:value},
            success:function(data){
                if(data.err_code === 5){
                    alert('亲，你还没登录，登录才能评价哦')
                    window.location.href = '/login'
                    return
                }
                $('.comment>span').hide()
                addCommentEle(data)
                ergodicReplayEvent()
            }
        })
    })


    //判断关注状态
    function pdstatus(){
        var $con = $('#concern')
        var arr = $con.text().replace(/\[|\]|\"/g,'').split(',')
        var au_id = $con.attr('au_id')
        if(arr.indexOf(au_id) != -1){
            $con.attr('data','1')
            $con.addClass('active')
            $con.text('')
            return
        }
        $con.text('')
        return
    }
    pdstatus()
    var timeid = null
    //加关注
    $('#concern').on('click',function(){
        if($(this).attr('login') === '0'){
            var c = confirm('你还未登录，请先登录!')
            if (c) {
                window.location.href = '/login'
                return
            }
            return
        }
        $(this).toggleClass('active')
        if ($(this).attr('data') === '0') {
            $(this).attr('data', '1')
        } else {
            $(this).attr('data', '0')
        }
        clearInterval(timeid)
        timeid = setTimeout(function () {
            $.ajax({
                url:'/attention',
                type:'get',
                data:{
                    status:$(this).attr('data'),
                    au_id:$(this).attr('au_id')
                },
                success:function(data){

                }
            })
        }.bind(this), 1000)
    })



    //ajax获取评论数据
    function getComments(){
        $('.comment ul').html('')
        var id = $('#article_id').val()
        $.ajax({
            url:'/query_comment',
            type:'post',
            data:{id:id},
            success:function(data){
                if(data.length === 0) return
                data.forEach(item =>{
                    addCommentEle(item)
                })
                if($('.comment ul').has('li')){
                    $('.comment>span').hide()
                    ergodicReplayEvent()
                }
            }
        })
    }
    //创建并添加评论元素
    function addCommentEle(item){
        var a_avatar = document.createElement('a')
        var img = document.createElement('img')
        a_avatar.href = "" //用户的头像
        img.src = "../public/img/userhead/" + item.user_avatar
        a_avatar.appendChild(img)

        var div = document.createElement('div')
        var dl = document.createElement('dl')
        var dt = document.createElement('dt')
        var dd1 = document.createElement('dd')
        var dd2 = document.createElement('dd')
        var a1 = document.createElement('a')
        var a2 = document.createElement('a')
        var span = document.createElement('span')
        
        span.innerHTML = item.comment_time
        a1.href = ''  //用户的id
        a1.innerHTML = item.user_name
        a2.href = 'javascript:void(0)'  //点赞数
        a2.className = 'comment_zan'
        a2.id = 'comment_zan'
        a2.innerHTML = item.zan_num
        dt.appendChild(a1)
        dt.appendChild(span)
        dt.appendChild(a2)

        dd1.innerHTML = item.comment_content

        var dd2content = '<b id="toggle-fu">回复</b>&nbsp;·&nbsp;<b value="1" class="query_reply">'+ item.replay_num +'条回复</b><br/>'+
                         '<div class="box-hf comment-write clearfix">'+
                         '<div class="div-hf">回复</div>'+
                         '<input type="hidden" name="" class="comment_id" value="'+item._id+'">'+
                         '<textarea class="comment-input" name="" id="comment-input" placeholder="写下您的回复"></textarea>'+
                         '</div>'
        dd2.innerHTML = dd2content

        dl.appendChild(dt)
        dl.appendChild(dd1)
        dl.appendChild(dd2)
        div.appendChild(dl)
        var li = document.createElement('li')
        li.appendChild(a_avatar)
        li.appendChild(div)
        $('.comment ul').prepend(li)

    }
    //回复框变高  //弹出回复框 //提交回复
    function ergodicReplayEvent(){
        //回复框变高
        $('.comment .comment-input').each(function(index,ele){
            $(ele).on('focus',function(){
                $(ele).parent().find('.div-hf').animate({marginTop:"100px"})
                $(this).animate({height:"150px"})
            })
        })
        //弹出回复框 //提交回复
        $('.comment #toggle-fu').each(function(index,ele){
            $(ele).on('click',function(){
                $(ele).parent().find('.box-hf').slideToggle(200)
            })
            $(ele).parent().find('.div-hf').on('click',function(){
                var reply = $(this).next().next().val().trim()
                var comment_id = $(this).next().val()
                if(reply.length === 0) return
                $.ajax({
                    url:'/reply',
                    type:'post',
                    data:{comment_id:comment_id,reply_content:reply},
                    success:function(data){
                        if(data.err_code === 5){
                            alert('亲，你还没登录，登录才能回复哦')
                            window.location.href = '/login'
                            return
                        }
                        $(ele).next().text((parseInt($(ele).next().text())+1).toString() + "条回复")
                        $(ele).parent().find('.div-hf').next().next().val('')
                        $(ele).parent().parent().parent().parent()[0].insertBefore(addReplyEle(data),
                        $(ele).parent().parent().parent().next()[0])
                        $(ele).parent().find('.box-hf').hide()
                        replyZan()
                    }
                })
            })
        });
        //遍历评论点赞按钮 //提交点赞
        $('.comment_zan').each(function(index,ele){
            $(ele)[0].onclick = function(){
                if($(ele).attr("value")) return
                $(ele).text((parseInt($(ele).text())+1).toString())
                $(ele).addClass('active').attr("value","1")
                var comment_id = $(ele).parent().next().next().find('.comment_id').val()
                $.ajax({
                    url:'/comment_zan',
                    type:'get',
                    data:{comment_id:comment_id},
                    success:function(data){
                        if(data.err_code === 5){
                            alert('亲，你还没登录，登录才能点赞哦')
                            window.location.href = '/login'
                            return
                        }
                    }
                })
            }
        })
        //绑定查询所有评论事件
        $('.query_reply').each(function(index,ele){
            $(ele).on('click',function(){
                if($(ele).attr("value") == 2){
                    $(ele).parent().parent().parent().parent().find('.reply-content').hide()
                    $(ele).attr("value","1")
                    return
                }
                if($(ele).attr("value") == 1){
                    $(ele).parent().parent().parent().parent().find('.reply-content').remove()
                    var comment_id = $(ele).parent().find('.comment_id').val()
                    $.ajax({
                        url:'/query_reply',
                        type:'post',
                        data:{comment_id:comment_id},
                        success:function(data){
                            data.forEach(function(item,index){
                                $(ele).parent().parent().parent().parent().append(addReplyEle(item))
                            })
                            $(ele).parent().parent().parent().parent().find('.reply-content').slideDown(200)

                            //遍历回复点赞按钮 //提交回复点赞
                            replyZan()

                        }
                    })
                    $(ele).attr("value","2")
                }

               
            })


        })
        


    }
    //创建并添加回复元素
    function addReplyEle(item){
        var div = document.createElement('div')
        var str = '<a href="#"><img src="../public/img/userhead/'+item.user_avatar+'" alt=""></a>'+
                  '<div><dl>'+
                  '<dt><a href="">'+item.user_name+'</a><span>'+item.reply_time+'</span><a value="'+item._id+'" href="javascript:void(0)" id="reply_zan" class="reply_zan">'+item.zan_num+'</a></dt>'+
                  '<dd>'+item.reply_content+'</dd></dl></div>'
        div.className = "reply-content"
        div.style = "display: block;"
        div.innerHTML = str
        return div
    }

    //提交回复点赞函数
    function replyZan(){
        $('.reply_zan').each(function(index,ele){
            $(ele)[0].onclick = function(){
                if($(ele).attr("mark")) return
                $(ele).text((parseInt($(ele).text())+1).toString())
                $(ele).addClass('active').attr("mark","1")
                var reply_id = $(ele).attr("value")
                $.ajax({
                    url:'/reply_zan',
                    type:'get',
                    data:{reply_id:reply_id},
                    success:function(data){
                        if(data.err_code === 5){
                            alert('亲，你还没登录，登录才能评价哦')
                            window.location.href = '/login'
                            return
                        }

                    }
                })
            }
        })


    }




});