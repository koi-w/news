$(function(){

    //search边框
    $(".search input[type=text]").focus(function(){
        $(this).css("border-color","#228ed8");
    }).blur(function(){
        $(this).css("border-color","");
    });

    //左侧导航栏定位  
    //toolbar
    $(window).scroll(function(){
        var topH = $(".top").height();
        if($(this).scrollTop() > topH){
            $("#clo1-menu").addClass("fixed");
        }else{
            $("#clo1-menu").removeClass("fixed");
        }

        if($(this).scrollTop() > 500){
            $(".tool-three").slideDown();
            $(".tool-one").css("margin-top","0px");
        }else{
            $(".tool-three").slideUp();
            $(".tool-one").css("margin-top","42px");
        }
    });

    //事件委派li => ul
    $('.search ul').on('click','li',function(){
        $(".search-text").val($(this).text())
        $('.search ul').hide()
    })

    //统计图片个数
    $('.hotpics em').each(function(index,ele){
        $(ele).text($(ele).text().split(',').length)
    })

     //搜索提示
     $(".search-text").on('keyup',function(){
        var con = $(this).val().trim()
        if(con.length === 0){
            $('.search ul').html(''); 
            $('.search ul').hide()
            return;
        }
        var html =  ''
        $.ajax({
            url:"/search",
            data:{text:con},
            type:'get',
            dataType:'json',
            success:function(data){
                if(data.length === 0){
                    $('.search ul').html(''); 
                    $('.search ul').hide();
                    return;
                }
                $('.search ul').show();
                data.forEach(function(item){
                    html += '<li data-id='+item._id+'>'+item.title+'</li>'
                })
                $('.search ul').html(html)
            }
        })
    })

    //搜索提交
    $('#search_sub').on('submit',function(e){
        e.preventDefault()
        if( $(".search-text").val().trim().length === 0) return;
        var html = '';
        var formdata = $(this).serialize()
        $.ajax({
            url:'/search_sub',
            data:formdata,
            type:'get',
            dataType:'json',
            success:function(data){
                data.forEach(function(item){
                    if(item.pic_arr){
                        html += `<li>
                        <div class="newspic"><a href="/article?id=${item._id}"><img src="../public/img/picture/${item.pic_arr[1]}" alt=""></a></div>
                        <div class="title">
                            <a href="/article?id=${item._id}">${item.title}</a>
                            <a href="#">${item.category}</a>&nbsp;
                            <a href="#">${item.author_name}</a>&nbsp;·
                            <a href="#">${item.comment_num}&nbsp;评论</a>&nbsp;·
                            <span>${item.release_time}</span>
                        </div>
                        </li>`;
                        return;
                    }
                    html += `<li>
                    <div class="newspic_null"><img src="../public/img/sysimages/logo.png" alt=""></div>
                    <div class="title">
                        <a href="/article?id=${item._id}">${item.title}</a>
                        <a href="#">${item.category}</a>&nbsp;
                        <a href="#">${item.author_name}</a>&nbsp;·
                        <a href="#">${item.comment_num}&nbsp;评论</a>&nbsp;·
                        <span>${item.release_time}</span>
                    </div>
                    </li>`
                   
                })
                $(".search-text").val('')
                $('.search ul').hide()
                $('.main ul').html(html)
            }
        })
    
    })
    
    //文章页、个人页搜索提交
    // $('.my_search').on('click',function(e){
    //     e.preventDefault()
    //     var con = $(this).prev().val().trim();
    //     if(con.length === 0) return;
    //     $.get({
    //         url:'/my_search',
    //         data:{text:con},
    //     })
    // })

});