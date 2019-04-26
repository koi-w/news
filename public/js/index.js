$(function(){
    //clo1 菜单
    $("#clo1-menu>dd").each(function(index,ele){
        $(ele).on("mouseenter",function(){
            $("#clo1-menu>dd a").removeClass("active");
            $(ele).find("a").addClass("active");
        });
    });

    //clo2 发布release 文本域增高
    // $("#bd-bo-ch").on("click",function(){
    //     $("#bd-bo-ch")[0].checked == true?$("#pic-txta").animate({height:"310px"})
    //     :$("#pic-txta").animate({height:"110px"});
    // });
    $("#bd-bo-ch").on("click",function(){
        $("#bd-bo-ch").prop("checked")?$("#pic-txta").animate({height:"460px"})
        :$("#pic-txta").animate({height:"110px"});
    });
    //新闻发布tab栏切换
    // $(".re-top li").each(function(index,ele){
    //     $(this).on("click",function(){
    //         $(this).addClass("active");
    //         $(this).siblings("li").removeClass("active");
    //         $(".re-bd li:eq("+index+")").show();
    //         $(".re-bd li:eq("+index+")").siblings("li").hide();
    //         $("#upload-pic").hide();
    //         $(".choose-emoji").hide();
    //         $("#upload-video").hide();
    //         $("#upload-qAa").hide();
    //     });
    // });
    //添加图片框显示隐藏
    $("#addpic").on("click",function(){
        $("#upload-pic").fadeToggle(200);
        $(".choose-emoji").hide();
    });
    //添加emoji框显示隐藏
    $("#addemoji").on("click",function(){
        $(".choose-emoji").fadeToggle(200);
        $("#upload-pic").hide();
    });
    // //添加视频框显示隐藏
    // $("#addvideo").on("click",function(){
    //     $("#upload-video").fadeToggle(200);
    // });
    // //添加问答框显示隐藏
    // $("#addqAa").on("click",function(){
    //     $("#upload-qAa").fadeToggle(200);
    // });
    // 判断发布图片文本域字数(封装) ele:对象 index:第几个li maxNum:字数限制
    var countNum = function(ele,index,maxNum){
        var num = ele.val().length;
        $(".re-bd ul li:eq("+index+")").find("b").text(num);
        num > maxNum?ele.css({"backgroundColor":"#fef6f7","color":"#c81131"})
        :ele.css({"backgroundColor":"#f3f4f5","color":"#747474"});
    }
    // 上传图片文本域
    $("#pic-txta").keyup(function (){
        countNum($("#pic-txta"),0,2000);
    });
    // //上传视频文本域
    // $("#video-txta").keyup(function(){
    //     countNum($("#video-txta"),1,30);
    // });
    // //上传问答text文本
    // $("#qAa-txt").keyup(function(){
    //     var num = $(this).val().length;
    //     num > 40?$(this).css({"backgroundColor":"#fef6f7","color":"#c81131"})
    //     :$(this).css({"backgroundColor":"#f3f4f5","color":"#747474"});
    // });
    // //上传问答文本域
    // $("#qAa-txta").keyup(function(){
    //     countNum($("#qAa-txta"),2,40);
    // });
    //emojis
    var emojis = ['微笑','爱慕','惊呆','酷拽','抠鼻','流泪','发怒','呲牙','鼾睡','害羞','可爱','晕','衰','闭嘴','机智',
        '来看我','灵光一闪','耶','捂脸','打脸','大笑','哈欠','震惊','送心','困','what','泣不成声','小鼓掌','酷','偷笑','石化',
        '思考','吐血','可怜','嘘','撇嘴','黑线','笑哭','雾霾','奸笑','得意','憨笑','抓狂','泪奔','钱','吻','恐惧','笑','快哭了',
        '翻白眼','互粉','赞','鼓掌','谢谢','kiss','去污粉','666','玫瑰','胡瓜','啤酒','我想静静','委屈','舔屏','鄙视','飞吻','再见',
        '紫薇别走','求抱抱','听歌','周冬雨的凝视','马思纯的微笑','吐舌','呆无辜','看','白眼','熊吉','骷髅','黑脸','吃瓜群众','绿帽子',
        '汗','摸头','皱眉','擦汗','红脸','尬笑','做鬼脸','强','如花','吐','惊喜','敲打','奋斗','吐彩虹','大哭','比心','加油','碰拳',
        'ok','击掌','左上','握手','18禁','刀','V5','给力','心','伤心','屎','礼物','蛋糕','撒花','不看','炸弹'];
    $(".choose-emoji i").each(function(index,ele){
        $(ele).on("click",function(){
           var start = $("#pic-txta")[0].selectionStart;
           var end = $("#pic-txta")[0].selectionEnd;
           var value = $("#pic-txta").val();
           value = value.substring(0,start) + "[" + emojis[index] + "]" + value.substring(end,value.length);
           $("#pic-txta")[0].value = value;
           var position = start + emojis[index].length + 2;
           $("#pic-txta").focus();
           $("#pic-txta")[0].setSelectionRange(position,position);
           countNum($("#pic-txta"),0,2000);
        });
    });




    //添加多个文章图片
    var pic_num = 0
    function addpic(){
        $('.articlePic_file').each(function(index,ele){
            $(ele).on('change',function(e){
                if(typeof FileReader == 'undefined'){
                    alert('当前浏览器不支持FileReader接口')
                    return false
                }
                var file = $(ele)[0].files[0]
                var render = new FileReader()
                render.readAsDataURL(file)
                //如果有，更改后就不执行了
                if($(ele).parent().find('img').attr('src')){
                    render.onload = function(e){
                        $(ele).parent().css({'border':'0'})
                        $(ele).parent().find('img').attr('src',e.target.result)
                    }
                    return
                }
                $(ele).parent().on('mouseenter',function(){
                    $(ele).parent().find('span').show()
                })
                $(ele).parent().on('mouseleave',function(){
                    $(ele).parent().find('span').hide()
                })
                $(ele).parent().find('span').on('click',function(){
                    $(ele).parent().remove()
                    $('.p-num').html('共 '+ --pic_num +' 张,还能上传 '+ (8-pic_num) +' 张')
                })
                if(!$(ele).parent().find('img').attr('src') && pic_num < 8){
                    //如果没有，就更改
                    render.onload = function(e){
                        $(ele).parent().css({'border':'0'})
                        $(ele).parent().find('img').attr('src',e.target.result)
                    }
                    var div = document.createElement('div')
                    var span = document.createElement('span')
                    var img = document.createElement('img')
                    var input = document.createElement('input')
                    div.className = "addpic"
                    span.className = "close_pic"
                    span.innerHTML = ""
                    input.type = 'file'
                    input.className = 'articlePic_file'
                    div.appendChild(span)
                    div.appendChild(img)
                    div.appendChild(input)
                    $('#upload-pic').append(div)
                    $('.p-num').html('共 '+ ++pic_num +' 张,还能上传 '+ (8-pic_num) +' 张')
                    addpic()
                }
            })  
            
        })
    }
    addpic()
    

    //上传文章
    $('#article_form').on("submit",function(e){
        e.preventDefault()
        return article_submit()
    })
    function article_submit(){
        //验证标题
        if($('#title_inp').val().trim().length === 0){
            $('.re-bd-bo p').html('标题不能为空')
            setTimeout(() => {$('.re-bd-bo p').html('')}, 3000);
            return false
        }
        if($('#pic-txta').val().trim().length === 0){
            $('.re-bd-bo p').html('内容不能为空')
            setTimeout(() => {$('.re-bd-bo p').html('')}, 3000);
            return false
        }
        if($('#pic-txta').val().trim().length > 2000){
            $('.re-bd-bo p').html('内容不能超过2000字')
            setTimeout(() => {$('.re-bd-bo p').html('')}, 3000);
            return false
        }
        $('.mask_release').show()
        var dataform = $('#article_form').serialize()
        var fd = new FormData()
        $('.articlePic_file').each(function(index,ele){
            if(ele.files[0]){
                fd.append('files',ele.files[0])
            }
        })
        $.ajax({
            url:'/article_release',
            type:'post',
            data:dataform,
            dataType:'json',
            success:function(data){
                var code = data.err_code
                if(code === 0){
                    $.ajax({
                        url:'/article_pics_release',
                        type:'post',
                        data:fd,
                        processData : false, //不处理发动的数据
                        contentType : false, //不要去设置Content-Type请求头
                        dataType:'json',
                        success:function(data){
                            var code = data.err_code
                            if(code === 0){
                                $('.mask_release').hide()
                                $('.mask_success').show()
                                setTimeout(() => {
                                    $('.mask_success').hide()
                                    window.location.href = '/'
                                }, 1000);
                                return
                            }
                            if(code === 500){
                                $('.re-bd-bo p').html('图片上传失败')
                                setTimeout(() => {$('.re-bd-bo p').html('')}, 3000);
                                return
                            }
                        }
                    })
                }
                if(code === 5){
                    $('.mask_release').hide()
                    $('.re-bd-bo p').html('用户无权限, 发布失败，未登录请登录后重试')
                    setTimeout(() => {$('.re-bd-bo p').html('')}, 3000);
                    return
                }
                if(code === 500){
                    $('.re-bd-bo p').html('上传失败，服务器繁忙，请稍后重试')
                    setTimeout(() => {$('.re-bd-bo p').html('')}, 3000);
                    return
                }
            }
        })

        
        

  
    }
});